import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AccessibleNavigationAnnouncer = () => {
    const [message, setMessage] = useState<string>("")
    
	const location = useLocation()

    useEffect(() => {
        if (location.pathname.slice(1)) {
            // make sure navigation has occurred and screen reader is ready
            setTimeout(() => setMessage(`Navigated to ${location.pathname.slice(1)} page.`), 500)
        } else {
            setMessage("")
        }
    }, [location])

    return (
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {message}
        </span>
    )
}

export default AccessibleNavigationAnnouncer