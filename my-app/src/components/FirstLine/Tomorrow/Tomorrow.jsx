import React,{useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { dateSlicer } from '../../../utils';

import { useSelector,useDispatch } from "react-redux";
import { addFilterData, removeFilterData } from '../../../redux/actions';

export default function Tomorrow({filter,domain}) {

  let [active, setActive] = useState([false,false,false]);
  let [didMount, setDidMount] = useState(false);

  let [datecheck, setDateCheck] = useState();

  const DomainData = useSelector((state) => state.Domain);
  const FiltersData = useSelector((state) => state.Filters);
  const SelectedData = useSelector((state) => state.Selected);
  const MbsOrdersData = useSelector((state) => state.MbsOrders);
  const HesedOrdersData = useSelector((state) => state.HesedOrders);

  const dispatch = useDispatch();
  
   //time interval
   setInterval(function() {
    let date = new Date();
    const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
    setDateCheck(tomorrow)
    },6*360000)

    useEffect(() => {
      console.log("tommorow: " + datecheck);

    }, [datecheck])
  
  let today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

let filteredMbsOrders = MbsOrdersData.filter(element => element.delivery_date == dateSlicer(didMount ? datecheck : tomorrow));
let filteredHesedOrders = HesedOrdersData.filter(element => element.delivery_date == dateSlicer(didMount ? datecheck : tomorrow));

if (domain == undefined) {
  domain = DomainData.domain
}

//Load Data
useEffect(() => {
  FiltersData.forEach(element => {
    if(element.name == SelectedData){
      let result = element.data.filter( active => active == "Tomorrow0" || active == "Tomorrow1" || active == "Tomorrow2" )
      result.forEach( filter => {
        if(filter == "Tomorrow0"){
          active[0] = true
          setActive([...active])
        }

        if(filter == "Tomorrow1"){
          active[1] = true
          setActive([...active])
        }

        if(filter == "Tomorrow2"){
          active[2] = true
          setActive([...active])
        }
        
      })
    }

})

setDateCheck(tomorrow)
setDidMount(true)

}, [SelectedData])


  const addHandle = (e) =>{
  if(DomainData.domain === "mbs"){
    active[DomainData.domainNumber] = !active[DomainData.domainNumber]
    setActive([...active])
    if(active[DomainData.domainNumber] == true){
      dispatch(addFilterData({name: SelectedData, data: "Tomorrow" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "Tomorrow" + DomainData.domainNumber}))

    }

  }
  if(DomainData.domain === "hesed"){
    active[DomainData.domainNumber] = !active[DomainData.domainNumber]
    setActive([...active])
    if(active[DomainData.domainNumber] == true){
      dispatch(addFilterData({name: SelectedData, data: "Tomorrow" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "Tomorrow" + DomainData.domainNumber}))

    }

  }
  if(DomainData.domain === "citysal"){
    active[DomainData.domainNumber] = !active[DomainData.domainNumber]
    setActive([...active])
    if(active[DomainData.domainNumber] == true){
      dispatch(addFilterData({name: SelectedData, data: "Tomorrow" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "Tomorrow" + DomainData.domainNumber}))

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
  height: '33.333vh' 
}

let filterStyles = {
  fontSize:'50px',
  height: '24.5vh', 
  width: '28.68vh'
}

  return (
    <Card onClick={() => console.log((domain == "mbs") ? filteredMbsOrders : filteredHesedOrders)} id={domain} sx={filter ? filterStyles : firstLine}>
      <CardContent style={{height:'30%'}}>
        
        <Typography style={{display:'flex',justifyContent:'center',alignItems:'center'}} variant="h4" component="div">
        <AddIcon  onClick={addHandle} style={addStyle}/>הזמנות למחר
        </Typography>
        
       
      </CardContent>
      <Typography variant="body">
<div className='length'> {(domain == "mbs") ? filteredMbsOrders.length : filteredHesedOrders.length} </div>
          <br/>
        </Typography>
    </Card>
  );
}