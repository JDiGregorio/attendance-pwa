import React from 'react'
import { useDispatch } from 'react-redux'

import { useAuth } from '../../hooks/auth'

import { resetUser } from '../../redux/reducers/userSlice'

const Header = () => {

    const { logout } = useAuth()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(resetUser())
        logout()
    }

    return (
        <header className="">
            title

            <button onClick={handleLogout} className="" aria-label="Account" aria-haspopup="true">
                JD
            </button>
        </header>
    )
}

export default Header