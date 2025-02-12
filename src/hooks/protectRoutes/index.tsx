import { Outlet, Navigate } from 'react-router-dom'
import { Store } from 'redux'

interface IProtectRoutes {
	store: Store
}

export const ProtectRoutes: React.FC<IProtectRoutes> = (props) => {
	const { user: { token } } = props.store.getState()

	return token ? <Outlet /> : <Navigate to="/" />
}