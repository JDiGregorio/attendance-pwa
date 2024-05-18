import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: any = {
	loading: false,
	error: null
}

export const fetchAllData = createAsyncThunk(
	'data/fetchAllData',
	async () => {
		const response = await axios.get('/api/pwa-get-all-data')

		return response.data
	}
)

const apiSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			return {
				...state,
				loading: action.payload.loading
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllData.pending, (state) => {
			state.loading = true
			state.error = null
		})
		.addCase(fetchAllData.fulfilled, (state) => {
			state.loading = false
		})
		.addCase(fetchAllData.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
	}
})

export const { setLoading } = apiSlice.actions

export default apiSlice.reducer