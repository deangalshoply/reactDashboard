const initialState = {}

const citysalOrdersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_CITYSAL_ORDERS':
           return state = action.payload
        
        case 'GET_CITYSAL_ORDERS':
            return state

        default:
            return state;
    }
}

export default citysalOrdersReducer