import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import { useSelector,useDispatch } from "react-redux";
import { addFilterData, removeFilterData } from '../../../redux/actions';

export default function TodayPickup({domain}) {

  let [active, setActive] = useState([false,false,false]);

  const DomainData = useSelector((state) => state.Domain);
  const SelectedData = useSelector((state) => state.Selected);
  const FiltersData = useSelector((state) => state.Filters);
  const MbsOrdersData = useSelector((state) => state.MbsOrders);
  const HesedOrdersData = useSelector((state) => state.HesedOrders);
  
  const dispatch = useDispatch();

let filteredMbsOrders = MbsOrdersData.filter(element => element.status == 'orderpickupready');
let filteredHesedOrders = HesedOrdersData.filter(element => element.status == 'orderpickupready');

if (domain == undefined) {
  domain = DomainData.domain
}

  
//Load Data
useEffect(() => {
  FiltersData.forEach(element => {
    if(element.name == SelectedData){
      let result = element.data.filter( active => active == "TodayPickup0" || active == "TodayPickup1" || active == "TodayPickup2" )
      result.forEach( filter => {
        if(filter == "TodayPickup0"){
          active[0] = true
          setActive([...active])
        }

        if(filter == "TodayPickup1"){
          active[1] = true
          setActive([...active])
        }

        if(filter == "TodayPickup2"){
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
      dispatch(addFilterData({name: SelectedData, data: "TodayPickup" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "TodayPickup" + DomainData.domainNumber}))

    }

  }
  if(DomainData.domain === "hesed"){
    active[DomainData.domainNumber] = !active[DomainData.domainNumber]
    setActive([...active])
    if(active[DomainData.domainNumber] == true){
      dispatch(addFilterData({name: SelectedData, data: "TodayPickup" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "TodayPickup" + DomainData.domainNumber}))

    }

  }
  if(DomainData.domain === "citysal"){
    active[DomainData.domainNumber] = !active[DomainData.domainNumber]
    setActive([...active])
    if(active[DomainData.domainNumber] == true){
      dispatch(addFilterData({name: SelectedData, data: "TodayPickup" + DomainData.domainNumber}))
    }
    if(active[DomainData.domainNumber] == false){
      dispatch(removeFilterData({name: SelectedData, data: "TodayPickup" + DomainData.domainNumber}))

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
  return (
    <Card id={domain} sx={{ width: 275 , height:275, borderRadius:'50px' }}>
      <CardContent>
        
        <Typography style={{display:'flex',justifyContent:'center',alignItems:'center'}} variant="h5" component="div">
<AddIcon  onClick={addHandle} style={addStyle}/>
         הזמנות מוכנות לאיסוף עצמי
        </Typography>
        
        <Typography variant="body">
<h1> {(DomainData.domain == "mbs") ? filteredMbsOrders.length : filteredHesedOrders.length} </h1>
          <br/>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}