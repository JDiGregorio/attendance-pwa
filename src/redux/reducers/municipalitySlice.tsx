import { createSlice } from '@reduxjs/toolkit'

import { TMunicipalityState } from '../../types'

const initialState: TMunicipalityState = {
	all: []
}

const municipalitySlice = createSlice({
	name: 'municipality',
	initialState,
	reducers: {
		setMunicipalities: (state, action) => {
			return {
				...state,
				all: action.payload.municipalities
			}
		},
		resetState: () => initialState
	}
})

export const { setMunicipalities, resetState } = municipalitySlice.actions

export default municipalitySlice.reducer