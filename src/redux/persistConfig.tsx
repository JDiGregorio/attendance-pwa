import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './reducers/userSlice'
import apiReducer from './reducers/apiSlice'
import projectReducer from './reducers/projectSlice'
import componentReducer from './reducers/componentSlice'
import activityReducer from './reducers/activitySlice'
import stateReducer from './reducers/stateSlice'
import municipalityReducer from './reducers/municipalitySlice'
import communityReducer from './reducers/communitySlice'
import eventReducer from './reducers/eventSlice'
import sessionReducer from './reducers/sessionSlice'
import beneficiaryTypeReducer from './reducers/beneficiaryTypeSlice'
import beneficiaryReducer from './reducers/beneficiarySlice'
import reportReducer from './reducers/reportSlice'

const rootReducer = combineReducers({
    user: userReducer,
    api: apiReducer,
    project: projectReducer,
    component: componentReducer,
    activity: activityReducer,
    state: stateReducer,
    municipality: municipalityReducer,
    community: communityReducer,
    event: eventReducer,
    session: sessionReducer,
    beneficiaryType: beneficiaryTypeReducer,
    beneficiary: beneficiaryReducer,
    report: reportReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'api', 'project', 'component', 'activity', 'state', 'municipality', 'community', 'event', 'session', 'beneficiaryType', 'beneficiary', 'report']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer