export const getDomain = (DomainData) => {
    return{
        type: 'GET_DOMAIN',
        payload: DomainData
    }
}

export const addFilterData = (FilterData) => {
    return{
        type: 'ADD_FILTER_DATA',
        payload: FilterData
    }
}

export const removeFilterData = (FilterData) => {
    return{
        type: 'REMOVE_FILTER_DATA',
        payload: FilterData
    }
}

export const addFilter = (newFilter) => {
    return{
        type: 'ADD_FILTERS',
        payload: newFilter
    }
}

export const getSelectedFilter = (selectedFilter) => {
    return{
        type: 'GET_SELECTED',
        payload: selectedFilter
    }
}

//MBS
export const fetchMbsOrders = (ordersData) => {
    return{
        type: 'FETCH_MBS_ORDERS',
        payload: ordersData
    }
}

export const getMbsOrders = (ordersData) => {
    return{
        type: 'GET_MBS_ORDERS',
        payload: ordersData
    }
}

export const postMbsOrders = (newOrder) => {
    return{
        type: 'POST_MBS_ORDERS',
        payload: newOrder
    }
}

export const putMbsOrders = (orderData) => {
    return{
        type: 'PUT_MBS_ORDERS',
        payload: orderData
    }
}

export const deleteMbsOrders = (ordersId) => {
    return{
        type: 'DELETE_MBS_ORDERS',
        payload: ordersId
    }
}


//HESED
export const fetchHesedOrders = (ordersData) => {
    return{
        type: 'FETCH_HESED_ORDERS',
        payload: ordersData
    }
}

export const getHesedOrders = (ordersData) => {
    return{
        type: 'GET_HESED_ORDERS',
        payload: ordersData
    }
}

export const postHesedOrders = (newOrder) => {
    return{
        type: 'POST_HESED_ORDERS',
        payload: newOrder
    }
}

export const putHesedOrders = (orderData) => {
    return{
        type: 'PUT_HESED_ORDERS',
        payload: orderData
    }
}

export const deleteHesedOrders = (ordersId) => {
    return{
        type: 'DELETE_HESED_ORDERS',
        payload: ordersId
    }
}


//CITYSAL
// export const fetchCitysalOrders = (ordersData) => {
//     return{
//         type: 'FETCH_CITYSAL_ORDERS',
//         payload: ordersData
//     }
// }

// export const getCitysalOrders = (ordersData) => {
//     return{
//         type: 'GET_CITYSAL_ORDERS',
//         payload: ordersData
//     }
// }