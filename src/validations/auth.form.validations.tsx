import { TCredentials, TErrors } from '../types'

export const loginForm = (values: TCredentials) => {
    const errors: TErrors = {}

    if (!values.email || values.email === "") {
        errors.email = 'Es necesario agregar el correo electrónico.'
    }

    if (!values.password || values.password === "") {
        errors.password = 'Es necesario agregar la contraseña.'
    }

    return errors
}