### REACT APPLICATION

Proyecto FullStack SUPERMENTORA.

### BACK
- NodeJs
-ExpressJs

### DATABASE
- MongoDB

### END-POINTS
1. USUARIOS
* POST: '/api/user/new-user' -> Registro de nuevos usuarios
* POST: '/api/user/login-user' -> Login de usuarios
* GET: '/api/user/confirm/:token' -> Validacion de token para confirmar al usuraio en el BACK
* POST: 'localhost:4000/api/user/forgot-password' -> Recuperación de password
* POST: 'localhost:4000/api/user/forgot-password/:token' -> Recuperación de password + token
* GET: '/perfil' -> JSON de usuario despues de loguearse

2. ADMIN
* POST: '/api/admin/new-user' -> Registro de nuevos usuarios
* POST: '/api/admin/login-user' -> Login de usuarios
* GET: '/api/admin/confirm/:token' -> Validacion de token para confirmar al usuraio en el BACK
* POST: 'localhost:4000/api/admin/forgot-password' -> Recuperación de password
* POST: 'localhost:4000/api/admin/forgot-password/:token' -> Recuperación de password + token
* GET: '/perfil' -> JSON de usuario despues de loguearse

3. FORMULARIOS - QUESTIONARIOS
* POST: '/api/form/create-form' -> Registro de nuevos usuarios
* DELETE: '/api/form//delete-form/:id' -> Login de usuarios