const initialState = {}

const mbsOrdersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_MBS_ORDERS':
           return state = action.payload


        case 'GET_MBS_ORDERS':
            return state
            
        case 'POST_MBS_ORDERS':
         let newState = [...state,action.payload]
            return newState

        case 'PUT_MBS_ORDERS':
            const orderId = action.payload.id
            const putState = [...state]
            let putId = putState.findIndex(item => item.id === orderId)
            putState[putId] = action.payload
            return putState

        case 'DELETE_MBS_ORDERS':
            const deleteId = action.payload.id
            const deleteState = [...state]
            let deleteIndex = deleteState.findIndex(item => item.id === deleteId)
            
            if(deleteIndex != -1){
                deleteState.splice(deleteIndex,1)
            }           
             return deleteState

        default:
            return state;
    }
}

export default mbsOrdersReducer