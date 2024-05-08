import React, { ReactNode } from 'react'

import { UserProvider } from './auth'

interface IAppProvider {
	children: ReactNode
}

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	return (
		<UserProvider>
			{children}
		</UserProvider>
	)
}