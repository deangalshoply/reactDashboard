import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import { stringToDate, currentTime, dateSlicer } from '../../../utils';
import { useSelector,useDispatch } from "react-redux";
import { addFilterData, removeFilterData } from '../../../redux/actions';

export default function OrdersInLate({filter,domain}) {
  
  let [active, setActive] = useState([false,false,false]);

  const DomainData = useSelector((state) => state.Domain);
  const SelectedData = useSelector((state) => state.Selected);
  const FiltersData = useSelector((state) => state.Filters);
  const MbsOrdersData = useSelector((state) => state.MbsOrders);
  const HesedOrdersData = useSelector((state) => state.HesedOrders);  

  if (domain == undefined) {
    domain = DomainData.domain
  }
  
  const dispatch = useDispatch();

  let realTime = currentTime()
 
  setInterval(function() {
    realTime = currentTime()
    
    // console.log(realTime);
      
    },20000)

  let today = new Date();
 
  //filter condition
let filteredMbsOrdersByStatus = MbsOrdersData.filter(element => 
  ( element.status != 'completed' && element.status != 'cancelled'  && element.delivery_type != 'pickup' && element.delivery_time != null) 
);

  let filteredMbsOrders = filteredMbsOrdersByStatus.filter(element => 
        
     ((element.delivery_date == dateSlicer(today)) && element.delivery_time.length == 5 && element.delivery_time.replace(':','') <= realTime) 
  || ((element.delivery_date == dateSlicer(today)) && element.delivery_time.length == 13 &&  element.delivery_time.slice(0,5).replace(':','') <= realTime )
  || (stringToDate(element.delivery_date) <= today));


  let filteredHesedOrdersByStatus = HesedOrdersData.filter(element => 
    ( element.status != 'completed' && element.status != 'cancelled'  && element.delivery_type != 'pickup' && element.delivery_time != null) 
  );
  
    let filteredHesedOrders = filteredHesedOrdersByStatus.filter(element => 
          
       ((element.delivery_date == dateSlicer(today)) && element.delivery_time.length == 5 && element.delivery_time.replace(':','') <= currentTime()) 
    || ((element.delivery_date == dateSlicer(today)) && element.delivery_time.length == 13 &&  element.delivery_time.slice(0,5).replace(':','') <= currentTime() )
    || (stringToDate(element.delivery_date) <= today));
  
  


 //Load Data
 useEffect(() => {
  FiltersData.forEach(element => {
    if(element.name == SelectedData){
      let result = element.data.filter( active => active == "OrdersInLate0" || active == "OrdersInLate1" || active == "OrdersInLate2" )
      result.forEach( filter => {
        if(filter == "OrdersInLate0"){
          active[0] = true
          setActive([...active])
        }

        if(filter == "OrdersInLate1"){
          active[1] = true
          setActive([...active])
        }

        if(filter == "OrdersInLate2"){
          active[2] = true
          setActive([...active])
        }
        
      })
    }

})
}, [SelectedData])


  const addHandle = (e) =>{
  if(DomainData.domain === "mbs"){
    active[DomainData.domainNumber] = !active[DomainData.domainNumber]
    setActive([...active])
    if(active[DomainData.domainNumber] == true){
      dispatch(addFilterData({name: SelectedData, data: "OrdersInLate" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "OrdersInLate" + DomainData.domainNumber}))

    }

  }
  if(DomainData.domain === "hesed"){
    active[DomainData.domainNumber] = !active[DomainData.domainNumber]
    setActive([...active])
    if(active[DomainData.domainNumber] == true){
      dispatch(addFilterData({name: SelectedData, data: "OrdersInLate" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "OrdersInLate" + DomainData.domainNumber}))

    }

  }
  if(DomainData.domain === "citysal"){
    active[DomainData.domainNumber] = !active[DomainData.domainNumber]
    setActive([...active])
    if(active[DomainData.domainNumber] == true){
      dispatch(addFilterData({name: SelectedData, data: "OrdersInLate" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "OrdersInLate" + DomainData.domainNumber}))

    }
  }
}
  
  let addStyle = {
  transition: 'transform 150ms ease',
  transform: active[DomainData.domainNumber] ? 'rotate(45deg)' : '', 
  marginRight:'7px',
  fontSize:'xx-large',
  cursor:'pointer'
 }

let firstLine = {
  fontSize:'50px',
  width: '25vw' ,
  height: '33.333vh' 
}

let filterStyles = {
  fontSize:'50px',
  height: '24.5vh', 
  width: '28.68vh'
}
  return (
    <Card id={domain} sx={filter ? filterStyles : firstLine}>
      <CardContent style={{height:'30%'}}>
        
        <Typography style={{display:'flex',justifyContent:'center',alignItems:'center'}} variant="h4" component="div">
<AddIcon  onClick={addHandle} style={addStyle}/>
        הזמנות קיימות באיחור מסירה
        </Typography>
        
        </CardContent>
      <Typography variant="body">
<div className='length'> {(domain == "mbs") ? filteredMbsOrders.length : filteredHesedOrders.length} </div>
          <br/>
        </Typography>
     
    </Card>
  );
}