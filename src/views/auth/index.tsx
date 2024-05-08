import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import withLayout from './Layout'
import Email from '../../components/Fields/Email'
import Password from '../../components/Fields/Password'

import { TCredentials, TErrors } from '../../types'
import { credentials } from '../../constants'

import { useAuth } from '../../hooks/auth'
import { storage } from '../../utilities'
import { loginForm } from '../../validations'

const Login = () => {
    const user = useSelector((state: any) => state.user) // add type selector

    const [userCredentials, setUserCredentials] = useState<TCredentials>(credentials)
    const [remember, setRemember] = useState<boolean>(false)
    const [errors, setErrors] = useState<TErrors>({})

    const { login } = useAuth()

    useEffect(() => {
        const isRemembered = storage.get("isRemembered")
        const email = storage.get("email")

        if (isRemembered) {
            setUserCredentials((prevState: TCredentials) => ({
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

    const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event)
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault()

        let newErrors = loginForm(userCredentials)

        setErrors(newErrors)

        if (!Object.keys(newErrors).length) {
            let tempUser = { ...userCredentials }
            
            tempUser.hasUpdates = user.hasUpdates
                     
            login(tempUser)
        } else {
            toast.error('Advertencia', {
                description: 'Verifique los datos requeridos para poder iniciar sesión.'
            })
        }
    }

    return (
        <>
            <hr className="block sm:hidden mb-8" />

            <div className="space-y-6">
                <Email
                    name="email"
                    label="Correo electrónico"
                    readonly={false}
                    required={true}
                    placeholder="Correo electrónico"
                    value={userCredentials.email}
                    setAction={setUserCredentials}
                    onKeyDown={handlePressEnter}
                    error={errors["email"] ?? null}
                />

                <Password
                    name="password"
                    label="Contraseña"
                    readonly={false}
                    required={true}
                    placeholder="Contraseña"
                    value={userCredentials.password}
                    setAction={setUserCredentials}
                    onKeyDown={handlePressEnter}
                    error={errors["password"] ?? null}
                />
            </div>

            <hr className="my-6 dark:border-gray-600" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember-me" name="remember-me" checked={remember} onChange={handleRemember} className="h-4 w-4 rounded cursor-pointer border-gray-300 text-gray-400 hover:text-gray-500 focus:ring-0 dark:bg-gray-500" />

                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-600">
                            Recordar usuario
                        </label>
                    </div>
                </div>

                <button type="submit" onClick={handleSubmit} className="flex w-full py-2 px-4 justify-center rounded-md border border-transparent bg-orange-500 text-sm font-semibold text-white uppercase shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    Ingresar
                </button>
            </div>
        </>
    )
}

export default withLayout(Login)