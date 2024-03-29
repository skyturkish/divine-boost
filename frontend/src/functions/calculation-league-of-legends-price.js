const common = [
    {
        text: 'Select Role',
        amount: 'FREE'
    },
    {
        text: 'Select Champions',
        amount: 'FREE'
    },
    {
        text: 'Offline Mode',
        amount: 'FREE'
    },
    {
        text: 'VPN Encryption',
        amount: 'FREE'
    },
    {
        text: 'Booster Selection',
        amount: 'FREE'
    }
]

const servers = {
    EUW: 100,
    NA: 100,
    EUNE: 90,
    RU: 60,
    TR: 20
}

const optionValues = {
    premium: {
        value: 25,
        text: 'Premium Option{%25}'
    },
    stream: {
        value: 20,
        text: 'Stream Option{%20}'
    },
    soloOnly: {
        value: 25,
        text: 'Solo Only Option{%25}'
    },
    highMMR: {
        value: 30,
        text: 'High MMR Option{%30}'
    },
    untrackable: {
        value: 30,
        text: 'Untrackable Option{%30}'
    },
    stier: {
        value: 20,
        text: 'S+ TIER Option{%20}'
    },
    isDuo: {
        value: 30,
        text: 'Duoboosting Option{%30}'
    },
    isNotNetWin: {
        value: -30,
        text: 'Duoboosting Option{%30}'
    }
}
function filterOptions(options) {
    let result = {}
    for (let key in options) {
        if (options[key] === true) {
            result[key] = true
        }
    }
    return result
}

function calculateNormalOrder(order, discount) {
    let total = 0
    const amountMultiple = 2

    let amountGame = order.amountGame.split(' ')[0]

    const rawPrice = +amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    total = total * (servers[order.server] / 100)

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

const placementsRank = {
    unranked: 2.75,
    iron: 1.5,
    bronze: 1.5,
    silver: 2.25,
    gold: 3,
    platinum: 4,
    emerald: 6,
    diamond: 8,
    master: 10,
    grandmaster: 12,
    challenger: 14
}

function placementsGame(order, discount) {
    let total = 0
    const amountMultiple = placementsRank[order.currentRank.division]

    let amountGame = order.amountGame.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    if (order.options.bonusWin) {
        texts.push({
            text: 'Bonus Win',
            amount: amountMultiple
        })
        total = total + amountMultiple
    }

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    total = total * (servers[order.server] / 100)

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

// ['35+','35-30LP','30-26LP','25-21LP','20-14LP']

const winRanks = [
    { 'iron-IV': 1.5 },
    { 'iron-III': 1.5 },
    { 'iron-II': 1.5 },
    { 'iron-I': 1.5 },
    { 'bronze-IV': 1.6 },
    { 'bronze-III': 1.7 },
    { 'bronze-II': 1.8 },
    { 'bronze-I': 1.9 },
    { 'silver-IV': 2 },
    { 'silver-III': 2.25 },
    { 'silver-II': 2.5 },
    { 'silver-I': 2.75 },
    { 'gold-IV': 3 },
    { 'gold-III': 3.5 },
    { 'gold-II': 4.0 },
    { 'gold-I': 4.5 },
    { 'platinum-IV': 5 },
    { 'platinum-III': 6 },
    { 'platinum-II': 7 },
    { 'platinum-I': 8 },
    { 'emerald-IV': 9 },
    { 'emerald-III': 10 },
    { 'emerald-II': 11 },
    { 'emerald-I': 12 },
    { 'diamond-IV': 12 },
    { 'diamond-III': 14 },
    { 'diamond-II': 16 },
    { 'diamond-I': 18 },
    { 'master-100': 21 }
    // 857 / 100 = 8.57 bunu tam sayiya yuvarla aşağa doğru, 8*4 = 32 + 21 = 53 diye hesapla
]
const gainLpPercentage = {
    '20-14LP': 0,
    '25-21LP': 0,
    '30-26LP': 20,
    '35-30LP': 30,
    '40-36LP': 40,
    '41+': 80
}

const masterPercentage = [
    { 'master-0': 21 },
    { 'master-100': 25 },
    { 'master-200': 29 },
    { 'master-300': 33 },
    { 'master-400': 37 },
    { 'master-500': 41 },
    { 'master-600': 45 },
    { 'master-700': 49 },
    { 'master-800': 53 },
    { 'master-900': 57 },
    { 'master-1000': 61 },
    { 'master-1100': 65 },
    { 'master-1200': 69 },
    { 'master-1300': 73 },
    { 'master-1400': 77 }
]

function pureLP(LP) {
    if (LP !== '41+') {
        const values2 = LP.replace('LP', '').split('-')

        let firstVal2 = parseInt(values2[0])
        let secondVal2 = parseInt(values2[1])

        return (firstVal2 + secondVal2) / 2
    } else {
        return 41
    }
}

function minPureLP(LP) {
    if (LP !== '41+') {
        const values2 = LP.replace('LP', '').split('-')

        let secondVal2 = parseInt(values2[1])

        return secondVal2
    } else {
        return 41
    }
}

function winGame(order, discount) {
    if (
        order.currentRank.division == 'master' ||
        order.currentRank.division == 'grandmaster' ||
        order.currentRank.division == 'challenger'
    ) {
        let total = 0
        let currentLP = +order.currentRank.currentLP

        const pureGainLP = minPureLP(order.gainLP)

        const amountGame = order.amountGame.split(' ')[0]

        let keys = masterPercentage.map(function (obj) {
            return Object.keys(obj)[0]
        })

        let amountMultipleIndex = keys.indexOf(
            'master' + '-' + Math.floor(currentLP / 100) * 100
        )

        let rawPrice = 0

        for (let i = 0; i < amountGame; i++) {
            rawPrice =
                rawPrice + +Object.values(masterPercentage[amountMultipleIndex])

            currentLP = currentLP + pureGainLP

            amountMultipleIndex = keys.indexOf(
                'master' + '-' + Math.floor(currentLP / 100) * 100
            )
        }

        rawPrice = rawPrice * ((gainLpPercentage[order.gainLP] + 100) / 100)

        const texts = [
            {
                text: 'Eloboosting Service',
                amount: rawPrice
            }
        ]

        total = total + rawPrice

        for (let option in order.options) {
            const currentOption = optionValues[option]
            if (currentOption) {
                currentOption.amount = rawPrice * (currentOption.value / 100)
                total += currentOption.amount
                texts.push(currentOption)
            }
        }

        total = total * (servers[order.server] / 100)

        const allTexts = texts.concat(common)

        return {
            total: total,
            texts: allTexts
        }
    } else {
        let total = 0

        let pureCurrentLP = pureLP(order.currentRank.currentLP)

        const pureGainLP = minPureLP(order.gainLP)

        const amountGame = order.amountGame.split(' ')[0]

        let keys = winRanks.map(function (obj) {
            return Object.keys(obj)[0]
        })

        let amountMultipleIndex = keys.indexOf(
            order.currentRank.division + '-' + order.currentRank.milestone
        )
        let rawPrice = 0

        let hicalattınmi = false

        for (let i = 0; i < amountGame; i++) {
            rawPrice =
                rawPrice + Object.values(winRanks[amountMultipleIndex])[0]

            pureCurrentLP = pureCurrentLP + pureGainLP

            if (pureCurrentLP >= 100) {
                if ((pureGainLP === 41 || pureGainLP === 38) & !hicalattınmi) {
                    if (
                        order.currentRank.milestone === 'III' ||
                        order.currentRank.milestone === 'IV'
                    ) {
                        hicalattınmi = true

                        amountMultipleIndex = amountMultipleIndex + 2
                    } else {
                        amountMultipleIndex = amountMultipleIndex + 1
                    }
                } else {
                    amountMultipleIndex = amountMultipleIndex + 1
                }

                pureCurrentLP = pureCurrentLP % 100
            }
        }

        rawPrice = rawPrice * ((gainLpPercentage[order.gainLP] + 100) / 100)

        const texts = [
            {
                text: 'Eloboosting Service',
                amount: rawPrice
            }
        ]

        total = total + rawPrice

        for (let option in order.options) {
            const currentOption = optionValues[option]
            if (currentOption) {
                currentOption.amount = rawPrice * (currentOption.value / 100)
                total += currentOption.amount
                texts.push(currentOption)
            }
        }

        total = total * (servers[order.server] / 100)

        const allTexts = texts.concat(common)

        return {
            total: total,
            texts: allTexts
        }
    }
}

function divisionOrder(order, discount) {
    let total = 0

    let pureCurrentLP = pureLP(order.currentRank.currentLP)

    const pureGainLP = minPureLP(order.gainLP)

    let keys = winRanks.map(function (obj) {
        return Object.keys(obj)[0]
    })

    let rawPrice = 0

    let amountMultipleIndex = keys.indexOf(
        order.currentRank.division + '-' + order.currentRank.milestone
    )

    let nextMultipleIndex = keys.indexOf(
        order.desiredRank.division + '-' + order.desiredRank.milestone
    )

    let amountGame = 0

    while (amountMultipleIndex != nextMultipleIndex) {
        if (
            Object.keys(winRanks[amountMultipleIndex])[0].split('-')[0] ==
            'master'
        ) {
            break
        }

        rawPrice = rawPrice + Object.values(winRanks[amountMultipleIndex])[0]

        pureCurrentLP = pureCurrentLP + pureGainLP

        if (pureCurrentLP >= 100) {
            if (pureGainLP === 41 || pureGainLP === 38) {
                if (
                    Object.keys(winRanks[amountMultipleIndex])[0].split(
                        '-'
                    )[1] === 'III' ||
                    Object.keys(winRanks[amountMultipleIndex])[0].split(
                        '-'
                    )[1] === 'IV'
                ) {
                    amountMultipleIndex = amountMultipleIndex + 2

                    pureCurrentLP = 0
                } else {
                    amountMultipleIndex = amountMultipleIndex + 1
                }
            } else {
                amountMultipleIndex = amountMultipleIndex + 1
            }

            pureCurrentLP = pureCurrentLP % 100
        }
        amountGame++
    }

    rawPrice = rawPrice * ((gainLpPercentage[order.gainLP] + 100) / 100)

    if (amountGame > 2) {
        rawPrice = rawPrice * (85 / 100)
    }

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    if (order.options.bonusWin) {
        if (
            Object.keys(winRanks[amountMultipleIndex])[0].split('-')[0] ==
            'master'
        ) {
            texts.push({
                text: 'Bonus Win',
                amount: 21
            })
            total = total + 21
        } else {
            texts.push({
                text: 'Bonus Win',
                amount: Object.values(winRanks[nextMultipleIndex])[0]
            })
            total = total + Object.values(winRanks[nextMultipleIndex])[0]
        }
    }

    total = total * (servers[order.server] / 100)

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

const lessonRank = {
    iron: 12,
    bronze: 12,
    silver: 12,
    gold: 12,
    platinum: 20,
    emerald: 22,
    diamond: 24
}

function lessonOrder(order) {
    let total = 0
    const amountMultiple = lessonRank[order.currentRank.division]

    let amountGame = order.hours.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }
    const allTexts = texts.concat(common)
    return {
        total: total,
        texts: allTexts
    }
}

function gameReplayOrder(order) {
    let total = 0
    const amountMultiple = lessonRank[order.currentRank.division]

    let amountGame = order.amountGame.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }
    const allTexts = texts.concat(common)
    return {
        total: total,
        texts: allTexts
    }
}
function liveGameOrder(order) {
    let total = 0
    const amountMultiple = lessonRank[order.currentRank.division]

    let amountGame = order.amountGame.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }
    const allTexts = texts.concat(common)
    return {
        total: total,
        texts: allTexts
    }
}

function playTogetherOrder(order) {
    let total = 0
    const amountMultiple = lessonRank[order.currentRank.division]

    let amountGame = order.amountGame.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }
    const allTexts = texts.concat(common)
    return {
        total: total,
        texts: allTexts
    }
}

function pureRR(LP) {
    if (LP !== '41+') {
        const values2 = LP.replace('RR', '').split('-')

        let firstVal2 = parseInt(values2[0])
        let secondVal2 = parseInt(values2[1])

        return (firstVal2 + secondVal2) / 2
    } else {
        return 41
    }
}

const winRanksValorant = [
    { 'iron-I': 4 },
    { 'iron-II': 4 },
    { 'iron-III': 4 },
    { 'bronze-I': 6 },
    { 'bronze-II': 6 },
    { 'bronze-III': 6 },
    { 'silver-I': 8 },
    { 'silver-II': 8 },
    { 'silver-III': 8 },
    { 'gold-I': 9 },
    { 'gold-II': 10 },
    { 'gold-III': 10 },
    { 'platinum-I': 12 },
    { 'platinum-II': 13 },
    { 'platinum-III': 15 },
    { 'diamond-I': 19 },
    { 'diamond-II': 21 },
    { 'diamond-III': 26 },
    { 'ascendant-I': 31 },
    { 'ascendant-II': 37 },
    { 'ascendant-III': 42 },
    { 'immortal-I': 45 },
    { 'immortal-II': 50 },
    { 'immortal-III': 55 }
    // 857 / 100 = 8.57 bunu tam sayiya yuvarla aşağa doğru, 8*4 = 32 + 21 = 53 diye hesapla
]
function minPureRR(LP) {
    if (LP !== '41+') {
        const values2 = LP.replace('RR', '').split('-')

        let secondVal2 = parseInt(values2[1])

        return secondVal2
    } else {
        return 41
    }
}

function valorantDivisionOrder(order) {
    let total = 0

    let pureCurrentLP = pureRR(order.currentRank.currentRR)

    const pureGainLP = minPureRR(order.gainRR)

    let keys = winRanksValorant.map(function (obj) {
        return Object.keys(obj)[0]
    })

    let rawPrice = 0

    let amountMultipleIndex = keys.indexOf(
        order.currentRank.division + '-' + order.currentRank.milestone
    )
    let nextMultipleIndex = keys.indexOf(
        order.desiredRank.division + '-' + order.desiredRank.milestone
    )

    let amountGame = 0

    while (amountMultipleIndex != nextMultipleIndex) {
        rawPrice =
            rawPrice + Object.values(winRanksValorant[amountMultipleIndex])[0]

        pureCurrentLP = pureCurrentLP + pureGainLP

        if (pureCurrentLP >= 100) {
            if (pureGainLP === 41 || pureGainLP === 38) {
                if (
                    Object.keys(winRanksValorant[amountMultipleIndex])[0].split(
                        '-'
                    )[1] === 'III'
                ) {
                    amountMultipleIndex = amountMultipleIndex + 2

                    pureCurrentLP = 0
                } else {
                    amountMultipleIndex = amountMultipleIndex + 1
                }
            } else {
                amountMultipleIndex = amountMultipleIndex + 1
            }

            pureCurrentLP = pureCurrentLP % 100
        }
        amountGame++
    }

    rawPrice = rawPrice * ((gainRRPercentage[order.gainRR] + 100) / 100)

    if (amountGame > 2) {
        rawPrice = rawPrice * (85 / 100)
    }

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    if (order.options.bonusWin) {
        texts.push({
            text: 'Bonus Win',
            amount: Object.values(winRanksValorant[nextMultipleIndex])[0]
        })
        total = total + Object.values(winRanksValorant[nextMultipleIndex])[0]
    }

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

const sureRanks = [
    'iron',
    'bronze',
    'silver',
    'gold',
    'platinum',
    'emerald',
    'diamond',
    'master',
    'grandmaster',
    'challenger'
]

const sureRanks2 = [
    'iron',
    'bronze',
    'silver',
    'gold',
    'platinum',
    'diamond',
    'ascendant',
    'immortal',
    'radiant'
]

function isExistError(order) {
    if (order.game == 'league-of-legends') {
        if (
            sureRanks.indexOf(order.currentRank.division) >
            sureRanks.indexOf(order.desiredRank.division)
        ) {
            return true
        }
    } else if (order.game == 'valorant') {
        if (
            sureRanks2.indexOf(order.currentRank.division) >
            sureRanks2.indexOf(order.desiredRank.division)
        ) {
            return true
        }
    }
}
const gainRRPercentage = {
    '20-14RR': 0,
    '25-21RR': 0,
    '30-26RR': 20,
    '35-30RR': 30,
    '40-36RR': 40,
    '41+': 80
}

function valorantWinOrder(order, discount) {
    let total = 0
    let pureCurrentLP = pureRR(order.currentRank.currentRR)
    const pureGainLP = minPureRR(order.gainRR)
    const amountGame = order.amountGame.split(' ')[0]

    let keys = winRanksValorant.map(function (obj) {
        return Object.keys(obj)[0]
    })

    let amountMultipleIndex = keys.indexOf(
        order.currentRank.division + '-' + order.currentRank.milestone
    )

    let rawPrice = 0

    let hicalattınmi = false

    for (let i = 0; i < amountGame; i++) {
        rawPrice =
            rawPrice + Object.values(winRanksValorant[amountMultipleIndex])[0]
        pureCurrentLP = pureCurrentLP + pureGainLP

        if (pureCurrentLP >= 100) {
            if ((pureGainLP === 41 || pureGainLP === 38) & !hicalattınmi) {
                if (order.currentRank.milestone === 'III') {
                    hicalattınmi = true

                    amountMultipleIndex = amountMultipleIndex + 2
                } else {
                    amountMultipleIndex = amountMultipleIndex + 1
                }
            } else {
                amountMultipleIndex = amountMultipleIndex + 1
            }

            pureCurrentLP = pureCurrentLP % 100
        }
    }
    rawPrice = rawPrice * ((gainRRPercentage[order.gainRR] + 100) / 100)

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }
    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

const placementsValorantRank = {
    unranked: 2.75,
    iron: 1.5,
    bronze: 1.5,
    silver: 2.25,
    gold: 3,
    platinum: 4,
    diamond: 8,
    ascendant: 10,
    immortal: 12,
    radiant: 14
}

function valorantPlacementsOrder(order, discount) {
    let total = 0
    const amountMultiple = placementsValorantRank[order.currentRank.division]

    let amountGame = order.amountGame.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    if (order.options.bonusWin) {
        texts.push({
            text: 'Bonus Win',
            amount: amountMultiple
        })
        total = total + amountMultiple
    }

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }

    const allTexts = texts.concat(common)

    return {
        total: total,
        texts: allTexts
    }
}

const valorantLessonRank = {
    iron: 12,
    bronze: 12,
    silver: 12,
    gold: 12,
    platinum: 20,
    diamond: 25,
    ascendant: 30,
    immortal: 40
}

function valorantLessonOrder(order) {
    let total = 0
    const amountMultiple = valorantLessonRank[order.currentRank.division]

    let amountGame = order.hours.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }
    const allTexts = texts.concat(common)
    return {
        total: total,
        texts: allTexts
    }
}
function valorantLiveGameOrder(order) {
    let total = 0
    const amountMultiple = valorantLessonRank[order.currentRank.division]

    let amountGame = order.amountGame.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }
    const allTexts = texts.concat(common)
    return {
        total: total,
        texts: allTexts
    }
}

function valorantPlayTogetherOrder(order) {
    let total = 0
    const amountMultiple = valorantLessonRank[order.currentRank.division]

    let amountGame = order.amountGame.split(' ')[0]

    let rawPrice = amountGame * amountMultiple

    const texts = [
        {
            text: 'Eloboosting Service',
            amount: rawPrice
        }
    ]

    total = total + rawPrice

    for (let option in order.options) {
        const currentOption = optionValues[option]
        if (currentOption) {
            currentOption.amount = rawPrice * (currentOption.value / 100)
            total += currentOption.amount
            texts.push(currentOption)
        }
    }
    const allTexts = texts.concat(common)
    return {
        total: total,
        texts: allTexts
    }
}

export const calculatePrice = (order) => {
    if (order.orderType == 'division' && isExistError(order)) {
        return {
            total: 50,
            texts: [
                {
                    text: 'Bonus Win',
                    amount: 30
                }
            ]
        }
    }

    order.options = filterOptions(order.options)

    if (order.game == 'league-of-legends') {
        switch (order.orderType) {
            case 'division':
                return divisionOrder(order)
            case 'win':
                return winGame(order)
            case 'placements':
                return placementsGame(order)
            case 'normal-game':
                return calculateNormalOrder(order)
            case 'lesson':
                return lessonOrder(order)
            case 'game-replay':
                return gameReplayOrder(order)
            case 'live-game':
                return liveGameOrder(order)
            case 'play-together':
                return playTogetherOrder(order)
        }
    } else if (order.game == 'valorant') {
        switch (order.orderType) {
            case 'division':
                return valorantDivisionOrder(order)
            case 'win':
                return valorantWinOrder(order)
            case 'placements':
                return valorantPlacementsOrder(order)
            case 'unrated':
                return valorantUnratedOrder(order)
            case 'lesson':
                return valorantLessonOrder(order)
            case 'live-game':
                return valorantLiveGameOrder(order)
            case 'play-together':
                return valorantPlayTogetherOrder(order)
        }
    }
}
