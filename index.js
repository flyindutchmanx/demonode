const express = require ('express');                //Importing Libraries
const redis = require ('redis');
const process = require ('process');

const app = express();                              //Createing a new instance of an express application

const client = redis.createClient ({
    host: 'redis-server',
    port: 6379
});                                                 //Setuping cooncetion to our redis server (container)

client.set ('visits',0);                            //Initializing key visits as zero

app.get ('/',(req, res) => {
    //process.exit(0); 
    client.get('visits',(err,visits) => {           //Getting the value from redis of key visits  
        
        res.send('Number of visits is ' + visits);  //Displaying value of visits from key visit in redis 
        
        client.set('visits',parseInt(visits) +1 );  //Making sure to add new vist in visits counts and the visits variable from redis will be returned as a string so converting it to an int
    });
});

app.listen(8081,() => {                           
    console.log('Listening on port 8081');        
});