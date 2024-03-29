const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const ReviewSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.ObjectId,
            ref: 'Order'
        },
        booster: {
            type: mongoose.ObjectId,
            ref: 'User'
        },
        star: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        game: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 300
        }
    },
    { timestamps: true }
)

ReviewSchema.plugin(autopopulate)

module.exports = mongoose.model('Review', ReviewSchema)
