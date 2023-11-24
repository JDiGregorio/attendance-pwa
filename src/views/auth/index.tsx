import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import withLayout from './Layout'
import Email from '../../components/Fields/Email'
import Password from '../../components/Fields/Password'

import { TCredentials, TErrors } from '../../types'
import { credentials } from '../../constants'
import { storage } from '../../utilities'
import { loginForm } from '../../validations'
import { useAuth } from '../../hooks/auth'

const Login = () => {
    const [userCredentials, setUserCredentials] = useState<TCredentials>(credentials)
    const [remember, setRemember] = useState(false)
    const [errors, setErrors] = useState<TErrors>({})

    const { login } = useAuth()

    useEffect(() => {
        const isRemembered = storage.get("isRemembered")
        const email = storage.get("email")

        if (isRemembered) {
            setUserCredentials(prevState => ({
                ...prevState,
                email: email
            }))

            setRemember(true)
        }
    }, [])

    useEffect(() => {
        if (remember && userCredentials.email)  {
            storage.set("isRemembered", true)
            storage.set('email', userCredentials.email)
        } else {
            storage.set("isRemembered", false)
            storage.remove('email')
        }
    }, [remember, userCredentials.email])

    const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event)
        }
    }

    const handleRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target

        setRemember(checked)

        if (checked && userCredentials.email && userCredentials.email !== "") {
            storage.set("isRemembered", true)
            storage.set("email", userCredentials.email)
        } else {
            storage.set("isRemembered", false)
            storage.remove("email")
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault()

        let newErrors = loginForm(userCredentials)

        setErrors(newErrors)

        if (!Object.keys(newErrors).length) {
            let tempUser = { ...userCredentials }
                     
            login(tempUser)
        } else {
            toast.error('Advertencia', {
                description: 'Verifique los datos requeridos para poder iniciar sesión.'
            })
        }
    }

    return (
        <>
            <hr className="" />

            <div className="">
                <Email
                    readonly={false}
                    label="Correo electrónico"
                    name="email"
                    placeholder="Correo electrónico"
                    value={userCredentials.email}
                    setAction={setUserCredentials}
                    onKeyDown={handlePressEnter}
                    error={errors["email"] ?? null}
                />

                <Password
                    readonly={false}
                    label="Contraseña"
                    name="password"
                    placeholder="Contraseña"
                    value={userCredentials.password}
                    setAction={setUserCredentials}
                    onKeyDown={handlePressEnter}
                    error={errors["password"] ?? null}
                />
            </div>

            <hr className="" />

            <div className="">
                <div className="">
                    <div className="">
                        <input id="remember-me" name="remember-me" type="checkbox" checked={remember} onChange={handleRemember} className="" />

                        <label htmlFor="remember-me" className="">
                            Recordar usuario
                        </label>
                    </div>

                    <Link to="/forgot-password" className="">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <button type="submit" onClick={handleSubmit} className="">
                    Ingresar
                </button>
            </div>
        </>
    )
}

export default withLayout(Login)