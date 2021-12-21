// import React,{useState,useEffect} from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import AddIcon from '@mui/icons-material/Add';

// import { useSelector,useDispatch } from "react-redux";
// import { addFilterData, removeFilterData } from '../../../redux/actions';

// export default function WaitingForDelivery() {

//   let [active, setActive] = useState([false,false,false]);

//   const DomainData = useSelector((state) => state.Domain);
//   const SelectedData = useSelector((state) => state.Selected);
//   const FiltersData = useSelector((state) => state.Filters);
// const MbsOrdersData = useSelector((state) => state.MbsOrders);
//   const HesedOrdersData = useSelector((state) => state.HesedOrders);

// let filteredMbsOrders = MbsOrdersData.filter(element => element.status == 'processing');

// //Load Data
// useEffect(() => {
//   FiltersData.forEach(element => {
//     if(element.name == SelectedData){
//       let result = element.data.filter( active => active == "WaitingForDelivery0" || active == "WaitingForDelivery1" || active == "WaitingForDelivery2" )
//       result.forEach( filter => {
//         if(filter == "WaitingForDelivery0"){
//           active[0] = true
//           setActive([...active])
//         }

//         if(filter == "WaitingForDelivery1"){
//           active[1] = true
//           setActive([...active])
//         }

//         if(filter == "WaitingForDelivery2"){
//           active[2] = true
//           setActive([...active])
//         }
        
//       })
//     }

// })
// }, [SelectedData])

//   const dispatch = useDispatch();

//   const addHandle = (e) =>{
//   if(DomainData.domain === "mbs"){
//     active[DomainData.domainNumber] = !active[DomainData.domainNumber]
//     setActive([...active])
//     if(active[DomainData.domainNumber] == true){
//       dispatch(addFilterData({name: SelectedData, data: "WaitingForDelivery" + DomainData.domainNumber}))
//     }
//     if(active[DomainData.domainNumber] == false){
//       dispatch(removeFilterData({name: SelectedData, data: "WaitingForDelivery" + DomainData.domainNumber}))

//     }

//   }
//   if(DomainData.domain === "hesed"){
//     active[DomainData.domainNumber] = !active[DomainData.domainNumber]
//     setActive([...active])
//     if(active[DomainData.domainNumber] == true){
//       dispatch(addFilterData({name: SelectedData, data: "WaitingForDelivery" + DomainData.domainNumber}))
//     }
//     if(active[DomainData.domainNumber] == false){
//       dispatch(removeFilterData({name: SelectedData, data: "WaitingForDelivery" + DomainData.domainNumber}))

//     }

//   }
//   if(DomainData.domain === "citysal"){
//     active[DomainData.domainNumber] = !active[DomainData.domainNumber]
//     setActive([...active])
//     if(active[DomainData.domainNumber] == true){
//       dispatch(addFilterData({name: SelectedData, data: "WaitingForDelivery" + DomainData.domainNumber}))
//     }
//     if(active[DomainData.domainNumber] == false){
//       dispatch(removeFilterData({name: SelectedData, data: "WaitingForDelivery" + DomainData.domainNumber}))

//     }
//   }
// }
  
//   let addStyle = {
//     transition: 'transform 150ms ease',
//     transform: active[DomainData.domainNumber] ? 'rotate(45deg)' : '', 
//     marginRight:'7px',
//     fontSize:'xx-large',
//     cursor:'pointer'
//    }
//   return (
//     <Card id={domain} sx={{ width: 275 , height:275 }}>
//       <CardContent>
        
//         <Typography style={{display:'flex',justifyContent:'center',alignItems:'center'}} variant="h4" component="div">
// <AddIcon   onClick={addHandle} style={addStyle}/>
//          הזמנות ממתינות לשליחות
//         </Typography>
        
//         <Typography variant="body">
// <div> {(DomainData.domain == "mbs") ? filteredMbsOrders.length : filteredHesedOrders.length} </div>
//           <br/>
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }