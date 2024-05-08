import { createSlice } from '@reduxjs/toolkit'

import { TBeneficiaryTypeState } from '../../types'

const initialState: TBeneficiaryTypeState = {
	all: []
}

const beneficiaryTypeSlice = createSlice({
	name: 'beneficiaryType',
	initialState,
	reducers: {
		setBeneficiaryTypes: (state, action) => {
			return {
				...state,
				all: action.payload.beneficiaryTypes
			}
		}
	}
})

export const { setBeneficiaryTypes } = beneficiaryTypeSlice.actions

export default beneficiaryTypeSlice.reducer