import User from '../models/Users.js'
import createId from '../helpers/createId.js'

// LOGIN; VALIDACION DE CREDENCIALES DE ACCESO
const login = async (req, res) => {
  const { email, password } = req.body
  // COMPROBAR SI EL USUARIO EXISTE
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('Usuario no existe')
    return res.status(412).json({ status: 412, msg: error.message })
  }
  // COMPROBAR SI EL ESTADO DEL USUARIO ES CONFIRMADO
  if (!user.confirmed) {
    const error = new Error('Cuenta no confirmada')
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
      city: user.city
    })
  } else {
    const error = new Error('Password incorrecto')
    return res.status(403).json({ status: 403, msg: error.message })
  }
}

// REGISTRO DE USUARIO
const register = async (req, res) => {
  // EVITAR REGISTROS DUPLICADOS
  const { email } = req.body
  const consultEmail = await User.findOne({ email })
  if (consultEmail) {
    const error = new Error('Usuario ya registrado')
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

export {
  login,
  register
}
