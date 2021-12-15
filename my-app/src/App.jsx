import './App.css';
import React,{useEffect,useState} from 'react'

import { CreateFilter, Topbar, Intro, AllLines, Filter } from './components/compnentsIndex'
import { fetchMbsOrders , fetchHesedOrders , postMbsOrders, putMbsOrders, deleteMbsOrders } from './redux/actions';
import { w3cwebsocket }  from 'websocket'
import { Route,Routes } from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";

function App() {

let client = new w3cwebsocket("ws://localhost:8080");
client.onopen = console.log("React Connected to 8080");
client.onmessage = message => setTest(message.data)


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
  
  let [test, setTest] = useState("");

  let [mbsOrders, setMbsOrders] = useState([]);
  let [hesedOrders, setHesedOrders] = useState([]);


  useEffect(async() => {
    
await fetch("http://localhost:8000/mbs-api")
.then(respone => respone.json())
.then(data => {
  setMbsOrders(data)
})

await fetch("http://localhost:8000/hesed-api")
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
console.log(message.data);
//hesed or mbs if /w origin.
  dispatch(postMbsOrders(JSON.parse(message.data)))

}


  return (
    <div className="App">
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
