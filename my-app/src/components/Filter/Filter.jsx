import React,{useEffect} from 'react'
import { useSelector } from "react-redux";
import {  Today, Tomorrow, TwoDays } from '../FirstLine/firstLineIndex';
import { ReadyForDelivery, ReadyForGather, WaitingForDelivery, TodayPickup, Unfound, InDelivery, } from '../SecondLine/secondLineIndex'
import {LateTimeline, FailedToDeliver, OrderInLateToday, OrdersInLate} from '../ThirdLine/thirdLineIndex'
import { AllLines } from '../compnentsIndex'

export default function Filter() {

    const SelectedData = useSelector((state) => state.Selected);
    const FiltersData = useSelector((state) => state.Filters);

   let Filter = FiltersData.filter(element => element.name == SelectedData)[0]


   let Data = Filter.data.map((item,index) => {
       //mbs condtions 
       if(item == 'Today0'){
        return item = <Today filter={true} filter={true} key={index} domain={'mbs'}/>
        }
       if(item == 'Tomorrow0'){
        return item = <Tomorrow filter={true} key={index} domain={'mbs'}/>
        }  
       if(item == 'TwoDays0'){
        return item = <TwoDays filter={true} key={index} domain={'mbs'}/>
        }
       if(item == 'InDelivery0'){
        return item = <InDelivery filter={true} key={index} domain={'mbs'}/>
        }
       if(item == 'ReadyForDelivery0'){
        return item = <ReadyForDelivery filter={true} key={index} domain={'mbs'}/>
        }
       if(item == 'ReadyForGather0'){
        return item = <ReadyForGather filter={true} key={index} domain={'mbs'}/>
        }
       if(item == 'TodayPickup0'){
        return item = <TodayPickup filter={true} key={index} domain={'mbs'}/>
        }
       if(item == 'Unfound0'){
        return item = <Unfound filter={true} key={index} domain={'mbs'}/>
        }  
       if(item == 'FailedToDeliver0'){
        return item = <FailedToDeliver filter={true} key={index} domain={'mbs'}/>
        }
       if(item == 'OrderInLateToday0'){
        return item = <OrderInLateToday filter={true} key={index} domain={'mbs'}/>
        }
       if(item == 'OrdersInLate0'){
        return item = <OrdersInLate filter={true} key={index} domain={'mbs'}/>
        }


       //hesed condtions
       if(item == 'Today1'){
        return item = <Today filter={true} key={index} domain={'hesed'}/>
        }
       if(item == 'Tomorrow1'){
        return item = <Tomorrow filter={true} key={index} domain={'hesed'}/>
        }  
       if(item == 'TwoDays1'){
        return item = <TwoDays filter={true} key={index} domain={'hesed'}/>
        }
       if(item == 'InDelivery1'){
        return item = <InDelivery filter={true} key={index} domain={'hesed'}/>
        }
       if(item == 'ReadyForDelivery1'){
        return item = <ReadyForDelivery filter={true} key={index} domain={'hesed'}/>
        }
       if(item == 'ReadyForGather1'){
        return item = <ReadyForGather filter={true} key={index} domain={'hesed'}/>
        }
       if(item == 'TodayPickup1'){
        return item = <TodayPickup filter={true} key={index} domain={'hesed'}/>
        }
       if(item == 'Unfound1'){
        return item = <Unfound filter={true} key={index} domain={'hesed'}/>
        }  
       if(item == 'FailedToDeliver1'){
        return item = <FailedToDeliver filter={true} key={index} domain={'hesed'}/>
        }
       if(item == 'OrderInLateToday1'){
        return item = <OrderInLateToday filter={true} key={index} domain={'hesed'}/>
        }
       if(item == 'OrdersInLate1'){
        return item = <OrdersInLate filter={true} key={index} domain={'hesed'}/>
        }
               
   })

   

    return (
        <>
         <div style={{ display:"flex",flexWrap:'wrap',alignContent:'center', justifyContent:'center'}}> {Data}</div> 
           
        
        </>
    )
}
