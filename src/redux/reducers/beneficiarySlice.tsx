import { createSlice } from '@reduxjs/toolkit'

import { TBeneficiaryState, TBeneficiary } from '../../types'

const initialState: TBeneficiaryState = {
	all: []
}

const beneficiarySlice = createSlice({
	name: 'beneficiary',
	initialState,
	reducers: {
		setBeneficiaries: (state, action) => {
			return {
				...state,
				all: action.payload.beneficiaries.map((beneficiary: TBeneficiary) => {
					return Object.assign({}, beneficiary, { created: false })
				})
			}
		},
		setNewBeneficiary: (state, action) => {
			return {
				...state,
				all: state.all.concat(action.payload.newBeneficiary)
			}
		},
		updateNewBeneficiary: (state, action) => {
			let newBeneficiaries = state.all.map((beneficiary: TBeneficiary) => {
				// eslint-disable-next-line
				if (beneficiary.id == action.payload.updateBeneficiary.id) {
					return { ...action.payload.updateBeneficiary }
				}

				return beneficiary
			})

			return {
				...state,
				all: newBeneficiaries
			}
		},
		deleteBeneficiary: (state, action) => {
			return {
				...state,
				all: state.all.filter((beneficiary) => beneficiary.id !== action.payload.beneficiaryId)
			}
		}
	}
})

export const { setBeneficiaries, setNewBeneficiary, updateNewBeneficiary, deleteBeneficiary } = beneficiarySlice.actions

export default beneficiarySlice.reducer