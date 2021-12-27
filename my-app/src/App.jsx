/* eslint-disable */ 

import './App.css';
import React,{useEffect,useState} from 'react'
import { CreateFilter, Topbar, Intro, AllLines, Filter } from './components/compnentsIndex'
import { fetchMbsOrders , fetchHesedOrders , postMbsOrders, putMbsOrders, deleteMbsOrders, postHesedOrders, putHesedOrders, deleteHesedOrders } from './redux/actions';
import { w3cwebsocket }  from 'websocket'
import { Route,Routes } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";

function App() {

  

let client = new w3cwebsocket("ws://34.255.200.10:8080");
client.onopen = console.log("React Connected to 8080");



//update
// client.onmessage = message => {
//  let foundIndex = orders.findIndex(order => order.id == message.data.id) 
//   orders[foundIndex] = message.data;
//   setTest(orders)
// }


//delete
// client.onmessage = message => {
//  let foundIndex = orders.findIndex(order => order.id == message.data.id) 
//   orders.splice(foundIndex,1)  
//   setTest(orders)
// }




  const SelectedData = useSelector((state) => state.Selected);
  const dispatch = useDispatch();
  

  let [mbsOrders, setMbsOrders] = useState([]);
  let [hesedOrders, setHesedOrders] = useState([]);


  useEffect(async() => {
    
await fetch("http://34.255.200.10:8000/mbs-api")
.then(respone => respone.json())
.then(data => {
  setMbsOrders(data)
})

await fetch("http://34.255.200.10:8000/hesed-api")
.then(respone => respone.json())
.then(data => {
  setHesedOrders(data)
})

  client.send("React Connected")

  
  }, [])




  useEffect(() => {

    dispatch(fetchMbsOrders(mbsOrders))

  }, [mbsOrders])

  useEffect(() => {

    dispatch(fetchHesedOrders(hesedOrders))

  }, [hesedOrders])


// post
client.onmessage = message => {
let msgData = message.data.split(", ");

if(msgData[2] == 'post'){
  
  if(msgData[1] == "bundles" ){
    dispatch(postMbsOrders(JSON.parse(msgData[0])))
  
  } else if(msgData[1] == "hesed" ) {
    dispatch(postHesedOrders(JSON.parse(msgData[0])))
    
    }
  }

  if(msgData[2] == 'put'){
    if(msgData[1] == "bundles" ){
      dispatch(putMbsOrders(JSON.parse(msgData[0])))
    
    } else if(msgData[1] == "hesed" ) {
      dispatch(putHesedOrders(JSON.parse(msgData[0])))
      
      }
  }
  
  if(msgData[2] == 'delete'){
    if(msgData[1] == "bundles" ){
      dispatch(deleteMbsOrders(JSON.parse(msgData[0])))
    
    } else if(msgData[1] == "hesed" ) {
      dispatch(deleteHesedOrders(JSON.parse(msgData[0])))
      
      }
  
  }
}


      

  return (
    <div  className="App">
      <Topbar/>

      <Routes>
        <Route path='/' element={<Intro/>}/>

        <Route path='/mbs' element={<AllLines domain={{domain:"mbs",domainNumber:0}}/>}/>
        <Route path='/hesed' element={<AllLines domain={{domain:"hesed",domainNumber:1}}/>}/>
        <Route path='/create' element={<CreateFilter/>}/>

        {/* <Route path='/citysal' element={<AllLines domain={{domain:"citysal",domainNumber:2}}/>}/> */}

        <Route path={'/' + SelectedData} element={<Filter/>}/>

      </Routes>
    </div>

      

  );
}

export default App;
