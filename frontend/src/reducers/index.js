import { combineReducers } from "redux";
import authReducer from '../slices/authSlices'
import profieReducer from "../slices/profileSlice";
import loadingBarReducer from "../slices/loadingBarSlice"
import diagnosesSliceReducer from '../slices/diagnosesSlice'
import mortalitySliceReducer from '../slices/mortalitySlices'
import searchQuerySliceReducer from '../slices/searchQuerySlice'
import losSliceReducer from '../slices/losSlice';

const rootReducer=combineReducers({
    auth:authReducer,
    diagnoses:diagnosesSliceReducer,
    mortality:mortalitySliceReducer,
    searchquery:searchQuerySliceReducer,
    los:losSliceReducer,
    profile:profieReducer,
    loadingBar: loadingBarReducer,
    
    
})

export default rootReducer;