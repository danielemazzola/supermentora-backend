import User from '../models/Users.js'
import createId from '../helpers/createId.js'
import createJWT from '../helpers/createJWT.js'

// LOGIN; VALIDACION DE CREDENCIALES DE ACCESO
const login = async (req, res) => {
  const { email, password } = req.body
  // COMPROBAR SI EL USUARIO EXISTE
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('User does not exist')
    return res.status(412).json({ status: 412, msg: error.message })
  }
  // COMPROBAR SI EL ESTADO DEL USUARIO ES CONFIRMADO
  if (!user.confirmed) {
    const error = new Error('unconfirmed account')
    return res.status(403).json({ status: 403, msg: error.message })
  }
  // COMPROBAR LA PASSWORD
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      telefono: user.telefono,
      country: user.country,
      city: user.city,
      token: createJWT(user._id)
    })
  } else {
    const error = new Error('wrong password')
    return res.status(403).json({ status: 403, msg: error.message })
  }
}

// REGISTRO DE USUARIO
const register = async (req, res) => {
  // EVITAR REGISTROS DUPLICADOS
  const { email } = req.body
  const consultEmail = await User.findOne({ email })
  if (consultEmail) {
    const error = new Error('User already registered')
    return res.status(401).json({ status: 401, msg: error.message })
  }

  // SI USUARIO NO EXISTE
  try {
    const user = new User(req.body)
    user.token = createId()
    const saveUser = await user.save()
    res.json(saveUser)
  } catch (error) {
    return res.status(400).json({ status: 400, msg: 'Error 400' })
  }
}

const confirmCount = async (req, res) => {
  const { token } = req.params
  const confirmUSer = await User.findOne({ token })
  if (!confirmUSer) {
    const error = new Error('invalid token')
    return res.status(401).json({ status: 401, msg: error.message })
  }
  try {
    confirmUSer.confirmed = true
    confirmUSer.token = ''
    await confirmUSer.save()
    res.json({ msg: 'user confirmed successfully' })
  } catch (error) {
    return res.status(400).json({ status: 400, msg: 'Error 400' })
  }
}

export {
  login,
  register,
  confirmCount
}
