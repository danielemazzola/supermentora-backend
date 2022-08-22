### END-POINTS

GET: '/' -> Devuelve mensaje desde la API SUPERMENTORA
POST: '/api/user/new-user' -> Registro de nuevos usuarios
POST: '/api/user/login-user' -> Login de usuarios
GET: '/api/user/confirm/:token' -> Validacion de token para confirmar al usuraio en el BACK
POST: 'localhost:4000/api/user/forgot-password' -> Recuperación de password
POST: 'localhost:4000/api/user/forgot-password/:token' -> Recuperación de password + token
GET: '/perfil' -> JSON de usuario despues de loguearse
