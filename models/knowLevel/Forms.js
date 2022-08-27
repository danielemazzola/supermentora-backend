import mongoose from "mongoose"

const FormSchema = mongoose.Schema({
    title: {
        type:Object,
        trim: true
    },
    data:{
        type:Array,
        default:[]
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
{
    timestamps: true
})

const Form = mongoose.model('Form', FormSchema)

export default Form