import mongoose from 'mongoose'

const LevelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    points: {
        type: Number,
        default: 0
    },
    levelLanguage: {
        type: Number,
        default: 0
    }

})

const Level = mongoose.model('Level', LevelSchema)

export default Level