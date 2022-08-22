import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  telefono: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  token: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  }
},
{
  timestamp: true
})

// ENCRIPATR LA PASSWORD DE REGISTRO
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(7)
  this.password = await bcrypt.hash(this.password, salt)
})
// VALIDAR PASSWORD
userSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password)
}

const User = mongoose.model('User', userSchema)

export default User