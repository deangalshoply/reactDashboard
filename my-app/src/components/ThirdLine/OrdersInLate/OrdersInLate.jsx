import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import { stringToDate, currentTime } from '../../../utils';
import { useSelector,useDispatch } from "react-redux";
import { addFilterData, removeFilterData } from '../../../redux/actions';

export default function OrdersInLate({filter,domain}) {
  
  let [active, setActive] = useState([false,false,false]);
  let [sTime, setTime] = useState('');

  const DomainData = useSelector((state) => state.Domain);
  const SelectedData = useSelector((state) => state.Selected);
  const FiltersData = useSelector((state) => state.Filters);
  const MbsOrdersData = useSelector((state) => state.MbsOrders);
  const HesedOrdersData = useSelector((state) => state.HesedOrders);  

  if (domain == undefined) {
    domain = DomainData.domain
  }
  
  const dispatch = useDispatch();

  //time interval
  setInterval(function() {

    setTime(currentTime())
      
    },35000)

    useEffect(() => {
      
      // console.log("Time: " + sTime);

    }, [sTime])

  let today = new Date();
 
  //filter condition
    //mbs Filter
  let nullFilterMbs = MbsOrdersData.filter(element => 
    (element.delivery_time != null) 
  );   
  
let filteredMbsOrdersByStatus = nullFilterMbs.filter(element => 
  (( element.status != 'completed' && element.status != 'cancelled'  &&  element.status != 'sucssefulydeliver' && element.status != 'failed' && element.delivery_type != 'pickup') ) 
  );

  let filteredDateMbs = filteredMbsOrdersByStatus.filter(element => 
    (stringToDate(element.delivery_date) < today.setHours(0,0,0,0))

    );

    
    let filtered5MbsOrders = filteredMbsOrdersByStatus.filter(element => {
    if(element.delivery_time.length == 5){
      return (stringToDate(element.delivery_date) == today.setHours(0,0,0,0) && element.delivery_time.replace(':','') <= sTime)
    }
  });
    
  let filtered13MbsOrders = filteredMbsOrdersByStatus.filter(element => {
    if(element.delivery_time.length == 13){
      return (stringToDate(element.delivery_date) == today.setHours(0,0,0,0) && element.delivery_time.slice(0,5).replace(':','') <= sTime)
    }
  });

   let filteredMbsOrders = filtered13MbsOrders.length + filtered5MbsOrders.length + filteredDateMbs.length
   let mbs = [filtered13MbsOrders , filtered5MbsOrders , filteredDateMbs]
 
  

  //hesed Filter
    let nullFilterHesed = HesedOrdersData.filter(element => 
      (element.delivery_time != null) 
    );

    let filteredHesedOrdersByStatus = nullFilterHesed.filter(element => 
    (( element.status != 'completed' && element.status != 'cancelled'  &&  element.status != 'sucssefulydeliver' && element.status != 'failed' && element.delivery_type != 'pickup') ) 
  );
  

  let filteredDateHesed = filteredHesedOrdersByStatus.filter(element => 
    (stringToDate(element.delivery_date) < today.setHours(0,0,0,0))

    );

    
  let filtered5HesedOrders = filteredHesedOrdersByStatus.filter(element => {
    if(element.delivery_time.length == 5){
      return (stringToDate(element.delivery_date) == today.setHours(0,0,0,0) && element.delivery_time.replace(':','') <= sTime)
     
    }
  });
    
  let filtered13HesedOrders = filteredHesedOrdersByStatus.filter(element => {
    if(element.delivery_time.length == 13){
      return (stringToDate(element.delivery_date) == today.setHours(0,0,0,0) && element.delivery_time.slice(0,5).replace(':','') <= sTime)
     
    }
  });
      
  let filteredHesedOrders = filtered13HesedOrders.length + filtered5HesedOrders.length + filteredDateHesed.length
  let hesed = [filtered13HesedOrders , filtered5HesedOrders , filteredDateHesed]
 


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

setTime(currentTime())

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
  width: '33.333vw' ,
  height: '34.2vh' 
}

let filterStyles = {
  fontSize:'50px',
  height: '24.5vh', 
  width: '28.68vh'
}
  return (
    <Card onClick={() => console.log((domain == "mbs") ? mbs : hesed)} id={domain} sx={filter ? filterStyles : firstLine}>
      <CardContent style={{height:'30%'}}>
        
        <Typography style={{display:'flex',justifyContent:'center',alignItems:'center'}} variant="h4" component="div">
<AddIcon  onClick={addHandle} style={addStyle}/>
        הזמנות קיימות באיחור מסירה
        </Typography>
        
        </CardContent>
      <Typography variant="body">
<div className='length'> {(domain == "mbs") ? filteredMbsOrders : filteredHesedOrders} </div>
          <br/>
        </Typography>
     
    </Card>
  );
}