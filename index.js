const express = require('express');
const { request } = require('http');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/portfolio');
    console.log('db connected..');
}

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    message:String
});

const User = mongoose.model('User',userSchema);

server.use(cors());
server.use(bodyParser.json());

server.post('/portfolio', async (request, response) => {
    let user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.phone = request.body.phone;
    user.message = request.body.message;

    const doc = await user.save();


    console.log(doc)
    response.json(doc);
    
});





server.listen(8081, () => {
     console.log("server started...");
});



