import mongoose from 'mongoose'

const usersLanding = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    phonenumber:{
        type:String,
        trim:true,
        required:true
    },
    userInstagram:{
        type:String,
        trim:true,
        required:true
    }
},{
    timestamps:true
}
)

const userLanding = mongoose.model('userLanding', usersLanding)

export default userLanding