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



//post eventEmiter
var postBody = "";
var putBody = "";
var deleteBody = "";
var domain = ""

app.post('/post',function(req,res) {
    postBody = req.body;
     eventEmitter.emit('onPost',JSON.stringify(postBody),(" " + domain))
     res.status(200).send('OK')


})

//put eventEmiter
app.post('/put',function(req,res) {
    putBody = req.body;
    eventEmitter.emit('onPut',JSON.stringify(putBody),(" " + domain))
    res.status(200).send('OK')


})

//delete eventEmiter
app.post('/delete',function(req,res) {
    deleteBody = req.body;
    eventEmitter.emit('onDelete',JSON.stringify(deleteBody),(" " + domain))
    res.status(200).send('OK')


})

app.get('/post',function(req,res) {

    res.send(postBody);
})

app.get('/put',function(req,res) {

    res.send(putBody);
})

app.get('/delete',function(req,res) {

    res.send(deleteBody);
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
eventEmitter.on('onPost', function(data,domain){
    connection.send([data,domain,' post'])  
})

// on put send data to react
eventEmitter.on('onPut', function(data,domain){
    connection.send([data,domain,' put'])  
})

// on delete send data to react
eventEmitter.on('onDelete', function(data,domain){
    connection.send([data,domain,' delete'])  
})

// all wss .on
wss.on("request", request => {
   connection =  request.accept(null, request.origin)
   connection.on("open", () => console.log("OPENED!"))
   connection.on("close", () => console.log("CLOSED!"))

   connection.on("message", message => {
       console.log(`Recived message ${message.utf8Data}`);
       domain = request.origin
   })
})

httpServer.listen(8080, () => console.log("Listening on 8080"));




// test function
// function send(){
//     connection.send(`Message ${Math.random()}`)

//     setTimeout(send,5000);
// }