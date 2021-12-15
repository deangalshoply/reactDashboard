import React from 'react'
import {  Today, Tomorrow, TwoDays } from './firstLineIndex';
import { useSelector } from "react-redux";

export default function FirstLine() {

 const DomainData = useSelector((state) => state.Domain);

    return (
        <>

    
        <div className="firstLine" >
            <TwoDays />
            <Tomorrow/>
            <Today/>
            
        </div>
        <br></br>
        </>
    )
}
