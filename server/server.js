//express
let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
const axios = require('axios')
let app = express()

let events = require('events')
let eventEmitter = new events.EventEmitter();


app.use(cors())
app.use(bodyParser.urlencoded({extended:true})).use(bodyParser.json())


//get mbs wp-json data
app.get('/mbs-api',function(req,res) {
    axios.get("https://dev.mybundles.co.il/wp-json/api/v1/orders", {
    headers: {
        'Cookie': 'open-site=yes'
    }
})
.then(result => {
    res.send(result.data)
   
}).catch(error => {
    console.log(error);
    })
})


//get hesed wp-json data
app.get('/hesed-api',function(req,res) {
    axios.get("https://dev.hesedlemehadrin.co.il/online/wp-json/api/v1/orders", {
    headers: {
        'Cookie': 'open-site=yes'
    }
})
.then(result => {
    res.send(result.data)
   
}).catch(error => {
    console.log(error);
    })
})



// post
var body = "";

app.post('/hook',function(req,res) {
     body = req.body;
    
     eventEmitter.emit('onPost',JSON.stringify(body))
     res.status(200).send('OK')


})

app.get('/hook',function(req,res) {

    res.send(body);
})

 
app.listen(8000,()=>{
    console.log("The server is up");
})



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@z@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@z@

// websocket

const http = require("http");
const WebsocketServer = require("websocket").server


let connection = null; 
const httpServer = http.createServer((req, res) => {
    console.log("We have recived a req");
})

const wss = new WebsocketServer({
    "httpServer": httpServer
})


// on post send data to react
eventEmitter.on('onPost', function(msg){
    console.log(msg);
    connection.send(msg)  
})

// all wss .on
wss.on("request", request => {
   connection =  request.accept(null, request.origin)
   connection.on("open", () => console.log("OPENED!"))
   connection.on("close", () => console.log("CLOSED!"))

   connection.on("message", message => {
       console.log(`Recived message ${message.utf8Data}`);

   })
})

httpServer.listen(8080, () => console.log("Listening on 8080"));




// test function
// function send(){
//     connection.send(`Message ${Math.random()}`)

//     setTimeout(send,5000);
// }