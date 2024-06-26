/*=============================================
Exportamos el endPoint de la APIREST de Firebase
=============================================*/
export let Api = {

	url: 'https://kaptah-cfdi-default-rtdb.firebaseio.com/' 

}
/*=============================================
=            Firebase Auth            =
=============================================*/

export let Register = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
}
/*=============================================
EndPoint para el ingreso de usuarios en Firebase Authentication
=============================================*/

export let Login = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
}
/*=============================================
EndPoint para enviar verificación de correo electrónico
=============================================*/
export let SendEmailVerification = {
	url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='
}
/*=============================================
EndPoint para confirmar email de verificación
=============================================*/

export let ConfirmEmailVerification = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key='

}
/*=============================================
EndPoint para tomar la data del usuario en Firebase auth
=============================================*/

export let GetUserData = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key='

}
/*=============================================
EndPoint para Resetear la contraseña
=============================================*/

export let SendPasswordResetEmail = {

 url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='

}
/*=============================================
EndPoint para confirmar el cambio de la contraseña
=============================================*/

export let VerifyPasswordResetCode = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key='

}

/*=============================================
EndPoint para enviar la contraseña
=============================================*/

export let ConfirmPasswordReset = {

	url:'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyBo8MXnWkR0b5gMN_UqMKWDhK6JZef2bFA'

}
