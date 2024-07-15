import axios from 'axios'
import { Store } from 'redux'

import { resetUserState } from './redux/reducers/userSlice'

const setupAxios = (store: Store) => {
    axios.interceptors.request.use(
        config => {
			const { user: { token } } = store.getState()

            if (token) {
                config.headers.Accept = "application/json"
                config.headers.Authorization = `Bearer ${token}`
            }

            return config
        },
        error => {
            if (error.response.status === 401) {
                store.dispatch(resetUserState())
            }

            return Promise.reject(error)
        }
    )

    axios.interceptors.response.use(
        response => {
            return response
        },
        error => {
            if (error.response.status === 401) {
                store.dispatch(resetUserState())
            }

            return Promise.reject(error)
        }
    )
}

export default setupAxios