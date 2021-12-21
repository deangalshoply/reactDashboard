import React from 'react'
import { ReadyForDelivery, ReadyForGather, WaitingForDelivery, TodayPickup, Unfound, InDelivery, } from './secondLineIndex'

export default function SecondLine({domain}) {
    return (
        <>
        <div className="secondLine">
        <TodayPickup domain={domain}/>
        <Unfound domain={domain}/>
        <InDelivery domain={domain}/>
        {/* <WaitingForDelivery domain={domain}/> */}
        <ReadyForDelivery domain={domain}/>
        <ReadyForGather domain={domain}/>
        </div>
    </>
    )
}
