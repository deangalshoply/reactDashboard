const initialState = {}

const hesedOrdersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_HESED_ORDERS':
           return state = action.payload
        
        case 'GET_HESED_ORDERS':
            return state

        default:
            return state;
    }
}

export default hesedOrdersReducer