import { createSlice } from '@reduxjs/toolkit'

import { TAttendance, TBeneficiary, TSession, TSessionState } from '../../types'
import { filters } from '../../constants'

const initialState: TSessionState = {
	all: [],
	filters: filters
}

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setSessions: (state, action) => {
			return {
				...state,
				all: action.payload.sessions.map((session: TSession) => {
					return Object.assign({}, session, { created: false, attached: false, upload: false })
				})
			}
		},
		setFilters: (state, action) => {
			return {
				...state,
				filters: action.payload.filters
			}
		},
		updateAttendance: (state, action) => {
			let newSessions = state.all.map((session: TSession) => {
				if (session.id === action.payload.sessionId) {
					let sessionCopy = { ...session }

					sessionCopy.attendances = sessionCopy.attendances.map((attendance: TAttendance) => {
						// eslint-disable-next-line
						if (attendance.beneficiario_id == action.payload.beneficiaryId) {
							return {
								...attendance,
								asistio: action.payload.attended
							}
						}

						return attendance
					})

					sessionCopy.upload = sessionCopy.attendances.filter((attendance: TAttendance) => Boolean(attendance.asistio) === true).length > 0 ? true : false

					return sessionCopy
			   	}

			   	return session
		   	})

			return {
				...state,
				all: newSessions
			}
		},
		updateComment: (state, action) => {
			let newSessions = state.all.map((session: TSession) => {
				// eslint-disable-next-line
				if (session.id == action.payload.sessionId) {
					let sessionCopy = { ...session }

					sessionCopy.comentario = action.payload.comment
					sessionCopy.upload = action.payload.comment !== null && action.payload.comment !== "" ? true : false

					return sessionCopy
			   	}

			   	return session
		   	})

			return {
				...state,
				all: newSessions
			}
		},
		setNewSession: (state, action) => {
			return {
				...state,
				all: state.all.concat(action.payload.newSession)
			}
		},
		updateNewSession: (state, action) => {
			let newSessions = state.all.map((session: TSession) => {
				// eslint-disable-next-line
				if (session.id == action.payload.sessionId) {
					return { ...action.payload.updateSession }
				}

				return session
			})

			return {
				...state,
				all: newSessions
			}
		},
		attachAttendance: (state, action) => {
			let newSessions = state.all.map((session: TSession) => {
				if (session.evento_id === action.payload.eventId) {
					let sessionCopy = { ...session }
					
					action.payload.beneficiaries.map((beneficiary: TBeneficiary) => {
						let newAttendance: TAttendance = {
							sesion_id: sessionCopy.id!,
							beneficiario_id: beneficiary.id!,
							asistio: false
						}

						sessionCopy.attendances = sessionCopy.attendances.concat(newAttendance)

						const { checked, ...rest } = beneficiary

						sessionCopy.beneficiarios = sessionCopy.beneficiarios.concat(rest)

						return beneficiary
					})

					sessionCopy.qty_preregistro = sessionCopy.beneficiarios.length
					sessionCopy.attached = true

					return sessionCopy
				}

				return session
			})

			return {
				...state,
				all: newSessions
			}
		},
		attachNewBeneficiary: (state, action) => {
			let newBeneficiary = action.payload.newBeneficiary

			let newSessions = state.all.map((session: TSession) => {
				if (session.evento_id === action.payload.eventId) {
					let sessionCopy = { ...session }

					let newAttendance: TAttendance = {
						sesion_id: sessionCopy.id!,
						beneficiario_id: newBeneficiary.id,
						asistio: false
					}

					sessionCopy.attendances = sessionCopy.attendances.concat(newAttendance)

					sessionCopy.beneficiarios = sessionCopy.beneficiarios.concat(newBeneficiary)

					sessionCopy.qty_preregistro = sessionCopy.beneficiarios.length
					sessionCopy.attached = true

					return sessionCopy
				}

				return session
			})

			return {
				...state,
				all: newSessions
			}
		},
		updateAttachedBeneficiary: (state, action) => {
			let newSessions = state.all.map((session: TSession) => {
				return {
					...session,
					beneficiarios: session.beneficiarios.map((beneficiary: TBeneficiary) => {
						// eslint-disable-next-line
						if (beneficiary.id == action.payload.updateBeneficiary.id) {
							return { ...action.payload.updateBeneficiary }
						}
						
						return beneficiary
					})
				}
			})

			return {
				...state,
				all: newSessions
			}
		},
		detachedBeneficiary: (state, action) => {
			let newSessions = state.all.map((session: TSession) => {
				return {
					...session,
					attendances: session.attendances.filter((attendance) => attendance.beneficiario_id !== action.payload.beneficiaryId),
					beneficiarios: session.beneficiarios.filter((beneficiary) => beneficiary.id !== action.payload.beneficiaryId)
				}
			})

			return {
				...state,
				all: newSessions
			}
		},
		resetState: () => initialState
	}
})

export const { setSessions, setFilters, updateAttendance, updateComment, setNewSession, updateNewSession, attachAttendance, attachNewBeneficiary, updateAttachedBeneficiary, detachedBeneficiary, resetState } = sessionSlice.actions

export default sessionSlice.reducer