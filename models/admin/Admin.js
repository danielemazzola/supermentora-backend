import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phonenumber: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
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
  timestamps: true
})

// ENCRIPATR LA PASSWORD DE REGISTRO
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(7)
  this.password = await bcrypt.hash(this.password, salt)
})
// VALIDAR PASSWORD
AdminSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password)
}

const Admin = mongoose.model('Admin', AdminSchema)

export default Admin
