import { ThunkAction, AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

import { fetchAllData, } from '../reducers/apiSlice'
import { setLastUpdateDate, setInitialized } from '../reducers/userSlice'
import { setProjects } from '../reducers/projectSlice'
import { setComponents } from '../reducers/componentSlice'
import { setActivities } from '../reducers/activitySlice'
import { setStates } from '../reducers/stateSlice'
import { setMunicipalities } from '../reducers/municipalitySlice'
import { setCommunities } from '../reducers/communitySlice'
import { setEvents } from '../reducers/eventSlice'
import { setSessions } from '../reducers/sessionSlice'
import { setBeneficiaryTypes } from '../reducers/beneficiaryTypeSlice'
import { setBeneficiaries } from '../reducers/beneficiarySlice'

export const fetchAndDistributeData = (): ThunkAction<void, any, unknown, AnyAction> => async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
	const result = await dispatch(fetchAllData())

	if (fetchAllData.fulfilled.match(result)) {
		const data = result.payload
		
		dispatch(setProjects({ projects: data.proyectos }))
		dispatch(setComponents({ components: data.componentes }))
		dispatch(setActivities({ activities: data.actividades }))
		dispatch(setStates({ states: data.estados }))
		dispatch(setMunicipalities({ municipalities: data.municipios }))
		dispatch(setCommunities({ communities: data.comunidades }))
		dispatch(setEvents({ events: data.eventos }))
		dispatch(setSessions({ sessions: data.sesiones }))
		dispatch(setBeneficiaryTypes({ beneficiaryTypes: data.beneficiarioTipos }))
		dispatch(setBeneficiaries({ beneficiaries: data.beneficiarios }))

		dispatch(setLastUpdateDate({ date:  new Date() }))

		dispatch(setInitialized({ initialized: false }))
	}
} 