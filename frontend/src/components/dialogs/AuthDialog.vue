<script setup>
import { ref } from 'vue'
import { useAccount } from '@/store/account'

const useAccountStore = useAccount()

const authType = ref('login')

const name = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')

const form =  ref(false)
const loading = ref(false)

const backendError = ref(null)
const backendSuccess = ref(null)

const emit = defineEmits(['close-dialog'])

const closeDialog = function(){
  emit('close-dialog')
}


const validationRules = {
      "name":  [
        value => {
          if (value) return true

          return 'Name is requred.'
        },
        value => {
          if (value?.length > 2) return true

          return 'Name must be at least 3 characters.'
        },
        value => {
          if (value?.length < 64) return true

          return 'Name must be less than 64 characters.'
        },
      ],
      "email": [
          value => {
            if (value) return true

            return 'E-mail is requred.'
          },
          value => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true

            return 'E-mail must be valid.'
          },
        ],
      "password": [
          value => {
            if (value) return true

            return 'Password is requred.'
          },
          value => {
            if (value?.length >= 6) return true

            return 'Password must be at least 6 characters.'
          },
          value => {
            if (value?.length < 32) return true

            return 'Password must be less than 32 characters.'
          },
      ],
      "repeatPassword": [
        value => {
          if (value) return true

          return 'Password have to check please type'
        },
        value => {
          if(value === password.value) return true

          return 'Password have to be the same'
        }
      ]
}

async function validate()   {
  const { valid } = await form.value.validate()
  return await valid
}

async function register() {
  backendError.value = null
  backendSuccess.value = null

  const valid = await validate()

  if (!valid) return

  try {
    loading.value = true
    await useAccountStore.register({
      user: {
        name: name.value,
        email: email.value,
        password: password.value,
      }
    })
    backendSuccess.value = 'You are now registered! Now Login'
    authType.value = 'login'
  } catch (error) {
    backendError.value = error.response.data.message
  } finally {
    loading.value = false
  }
}

async function login() {
  console.log('login yapılıyor')
  backendError.value = null
  backendSuccess.value = null

  const valid = await validate()

  console.log('valid evet', valid)
  if (!valid) return

  try {
    loading.value = true
    const user = await useAccountStore.login({
      user: {
        email: email.value,
        password: password.value
      }
    })
    form.value.reset()
    backendSuccess.value = null
    await useAccountStore.fetchSession()
    console.log('everthing is fine')
    closeDialog()
  } catch (error) {
    console.log('a error appeared', error)
    backendError.value = error.response.data.message
  } finally {
    loading.value = false
  }
}
function continueAsGuest() {
  console.log('continue as guest')
}
</script>

<template lang="pug">
v-form(ref="form")
  .account-login(v-show="authType === 'login'")
    img.left-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/auth-dialog-image.webp" alt="auth-dialog-image")
    .background
      .title ACCOUNT LOGIN
      .subtitle-text-fields
        .subtitle Sign into your EB7 account
        .erroralert(v-if="backendError") {{ backendError }}
        .successalert(v-if="backendSuccess") {{ backendSuccess }}
        v-text-field.email-text-field(v-model="email" :rules="validationRules.email" bg-color="#EEE" label="E-Mail" variant="solo" required)
        v-text-field.password-text-field(type="password" v-model="password" :rules="validationRules.password" bg-color="#EEE" label="Password" variant="solo" required)
      v-btn.colorfulbutton(@click="login" :loading="loading") LOGIN
      .logos
      v-btn.grey-button(@click="authType = 'register'") CREATE ACCOUNT
  .create-account(v-show="authType === 'register'")
    img.left-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/auth-dialog-image.webp" alt="auth-dialog-image")
    .background
      .title CREATE ACCOUNT
      .subtitle-text-fields
        .subtitle Create a new EB7 account
        .erroralert(v-if="backendError") {{ backendError }}
        v-text-field.username-text-field(v-if="authType === 'register'" v-model="name" :rules="validationRules.name" bg-color="#EEE" label="Username" variant="solo" required)
        v-text-field.email-text-field(v-model="email" :rules="validationRules.email" bg-color="#EEE" label="E-Mail" variant="solo" required)
        v-text-field.password-text-field(type="password" v-model="password" :rules="validationRules.password" bg-color="#EEE" label="Password" variant="solo" required)
        v-text-field.repeat-password-text-field(type="password" v-if="authType === 'register'" v-model="repeatPassword" :rules="validationRules.repeatPassword" bg-color="#EEE" label="Repeat Password" variant="solo" required)
      v-btn.colorfulbutton(@click="register" :loading="loading") REGISTER
      v-btn.grey-button(@click="authType = 'login'") LOGIN
  .continue-as-guest(v-show="authType === 'guest'")
    img.left-image(src="https://storage.googleapis.com/divine-boost-bucket/assets/assets/auth-dialog-image.webp" alt="auth-dialog-image")
    .background(v-bind:style="{height: '43.875rem'}")
      .title CONTINUE AS GUEST
      .subtitle-text-fields
        .subtitle Continue as Guest for one time purchase
        .erroralert(v-if="backendError") {{ backendError }}
        v-text-field.email-text-field(v-model="email" :rules="validationRules.email" bg-color="#EEE" label="E-Mail" variant="solo" required)
      v-btn.colorfulbutton(@click="continueAsGuest" :loading="loading") CONTINUE AS GUEST
      v-btn.grey-button.little-padding-top(@click="authType = 'register'") CREATE AN ACCOUNT INSTEAD

</template>

<style scoped>
.account-login,
.create-account,
.continue-as-guest,
.one-more-step {
  width: 900px;
  height: 700px;
  border-radius: 5px;
  background-color: #fff;
  display:flex;
}
.account-login,
.create-account,
.one-more-step {
  height: 700px;
}
.continue-as-guest {
  height: 700px;
}
.left-image {
  width: 27.27%;
}
.background {
  width: 800px;
  height: 700px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem
}
.title {
  color: #222;
  font-size: 36px;
  font-weight: 700;
}
.subtitle-text-fields {
  width: 37.5rem;
}
.subtitle {
  color: #444;
  font-size: 24px;
  font-weight: 600;
  padding: 2rem 0;
}
.v-divider {
  border-color: #ffffff !important;
  width: 37.5rem;
  margin-top: 3rem;
}
.connect-text-background {
  background-color: #161616;
  z-index: 0;
  margin-top: -7.5px;
  padding-right: 30px;

}
.connect-text {
  padding-left: 30px;
  font-size: 11px;
  font-weight: 600;
  color: #ddd;
}

.colorfulbutton,
.grey-button {
  width: 96%;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: normal;
  border-radius: 8px;
}
.colorfulbutton {
  background-image: linear-gradient(to right, #1c00c9, #260056);
  color: #FFF;
}
.grey-button {
  background-color: #d9d9d9;
  color: #000;
  margin-top: 1rem;
}
.little-padding-top {
  margin-top: 1.5rem;
}
.erroralert {
  color: #632929;
}
.successalert {
  color: #0F630F;
}

</style>
