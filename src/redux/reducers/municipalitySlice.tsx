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
		}
	}
})

export const { setMunicipalities } = municipalitySlice.actions

export default municipalitySlice.reducer