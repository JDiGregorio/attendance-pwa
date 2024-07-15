import { createSlice } from '@reduxjs/toolkit'

import { TCommunityState } from '../../types'

const initialState: TCommunityState = {
	all: []
}

const communitySlice = createSlice({
	name: 'community',
	initialState,
	reducers: {
		setCommunities: (state, action) => {
			return {
				...state,
				all: action.payload.communities
			}
		},
		resetCommunityState: () => initialState
	}
})

export const { setCommunities, resetCommunityState } = communitySlice.actions

export default communitySlice.reducer