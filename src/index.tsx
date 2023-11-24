import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import ThemedSuspense from './components/Navigation/ThemedSuspense'
import App from './App'
import AccessibleNavigationAnnouncer from './components/Navigation/AccessibleNavigationAnnouncer'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

import { store, persistor } from './redux/store'

import { AppProvider } from './hooks'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<Suspense fallback={<ThemedSuspense />}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter basename={"/"}>
						<AppProvider>
							<AccessibleNavigationAnnouncer />
							<App />
							<Toaster position="top-right" richColors closeButton expand={true} />
						</AppProvider>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</Suspense>
	</React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()