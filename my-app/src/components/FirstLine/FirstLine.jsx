import React from 'react'
import {  Today, Tomorrow, TwoDays, OrdersTimeline } from './firstLineIndex';
import { useSelector } from "react-redux";

export default function FirstLine() {

 const DomainData = useSelector((state) => state.Domain);

    return (
        <>

    
        <div className="firstLine" >
            <OrdersTimeline/>
            <TwoDays />
            <Tomorrow/>
            <Today/>
            
        </div>
        </>
    )
}
