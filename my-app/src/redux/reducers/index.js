import { combineReducers } from "redux";
import domainReducer from "./domain";
import filtersReducer from "./filter";
import selectedReducer from "./selected";
import mbsOrdersReducer from "./mbsOrders";
import hesedOrdersReducer from "./hesedOrders";
import citysalOrdersReducer from "./citysalOrders";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConifg = {
    key: 'root',
    storage,
    whitelist: ['Domain','Filters','Selected','MbsOrders','HesedOrders']
}

const rootReducer = combineReducers({
    Domain: domainReducer,
    Filters: filtersReducer,
    Selected: selectedReducer,
    MbsOrders: mbsOrdersReducer,
    HesedOrders: hesedOrdersReducer,
    // CitysalOrders: citysalOrdersReducer

})

export default persistReducer(persistConifg, rootReducer);