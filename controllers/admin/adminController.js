import Admin from '../../models/admin/Admin.js'
import createId from '../../helpers/createId.js'
import createJWT from '../../helpers/createJWT.js'

// LOGIN; VALIDACION DE CREDENCIALES DE ACCESO
const login = async (req, res) => {
  const { email, password } = req.body
  // COMPROBAR SI EL USUARIO EXISTE
  const user = await Admin.findOne({ email })
  if (!user) {
    const error = new Error('User does not exist')
    return res.status(404).json({ status: 404, msg: error.message })
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
      token: createJWT(user._id)
    })
  } else {
    const error = new Error('Wrong password')
    return res.status(403).json({ status: 403, msg: error.message })
  }
}

// REGISTRO DE USUARIO
const register = async (req, res) => {
  // EVITAR REGISTROS DUPLICADOS
  const { email } = req.body
  const consultEmail = await Admin.findOne({ email })
  if (consultEmail) {
    const error = new Error('User already registered')
    return res.status(401).json({ status: 401, msg: error.message })
  }

  // SI USUARIO NO EXISTE
  try {
    const user = new Admin(req.body)
    user.token = createId()
    const saveUser = await user.save()
    res.json(saveUser)
  } catch (error) {
    console.log(error.message)
  }
}
// CONFIRMANDO ACOUNT
const confirmCount = async (req, res) => {
  const { token } = req.params
  const confirmUSer = await Admin.findOne({ token })
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
    console.log(error.message)
  }
}
// RECUPERAR PASSWORD
const recoverPassword = async (req, res) => {
  const { email } = req.body
  const user = await Admin.findOne({ email })
  if (!user) {
    const error = new Error('User does not exist')
    return res.status(404).json({ status: 404, msg: error.message })
  }
  try {
    user.token = createId()
    await user.save()
    res.json({ msg: 'We have sent instructions to your email to reset your password' })
  } catch (error) {
    console.log(error.message)
  }
}
// VALIDAR EL TOKEN PARA LA RECUPERACIÓN DE PASSWORD
const recoverPasswordToken = async (req, res) => {
  const { token } = req.params
  const validateToken = await Admin.findOne({ token })
  if (!validateToken) {
    const error = new Error('Invalid token')
    return res.status(401).json({ status: 401, msg: error.message })
  } else {
    res.json({ msg: 'Valid Token' })
  }
}
// NUEVA PASSWORD
const newPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const user = await Admin.findOne({ token })
  if (user) {
    user.password = password
    user.token = ''
    try {
      await user.save()
      res.json({ msg: 'Password modified successfully' })
    } catch (error) {
      console.log(error.message)
    }
  } else {
    const error = new Error('Invalid token')
    return res.status(404).json({ status: 404, msg: error.message })
  }
}
// ACCEDIENDO A LA INFORMACIÓN DEL USUARIO
const perfil = async (req, res) => {
  const { user } = req
  res.json({ user })
}

export {
  login,
  register,
  confirmCount,
  recoverPassword,
  recoverPasswordToken,
  newPassword,
  perfil
}
