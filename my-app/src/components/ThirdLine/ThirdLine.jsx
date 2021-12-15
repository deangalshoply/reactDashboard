import React from 'react'
import {LateTimeline, FailedToDeliver, OrderInLateToday, OrdersInLate} from './thirdLineIndex'

export default function ThirdLine({domain}) {
    return (
        <>
        <div className="thirdLine">
        <LateTimeline domain={domain}/>
        <FailedToDeliver domain={domain}/>
        <OrderInLateToday domain={domain}/>
        <OrdersInLate domain={domain}/> 
        </div>
        <br></br>
        </>
    )
}
