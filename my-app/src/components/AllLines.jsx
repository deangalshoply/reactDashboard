import React,{useEffect} from 'react'
import { FirstLine, SecondLine, ThirdLine } from './compnentsIndex'

import { useDispatch } from "react-redux";
import { getDomain } from '../redux/actions/index'


export default function AllLines({domain}) {
    
    const dispatch = useDispatch();

 useEffect(() => {
    dispatch(getDomain(domain));
 }, [domain])
    
 
    return (
        <>
        <FirstLine />
        <SecondLine/>
        <ThirdLine/>  
        </>
    )
}
