const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/usermodel');

mongoose.connect('mongodb+srv://admin-mank:mankMongo@cluster0.5sulplv.mongodb.net/mern-login', {useNewUrlParser: true})

const PORT = 5000

app.use(cors())
app.use(express.json())

//Working on validation while registering
app.post('/api/register', async(req, res)=>{
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        res.json({status: 'ok'});
    } catch (error) {
        console.log(error)
        res.json({status: 'error', error: 'Duplicate email'});
    }
})

app.post('/api/login', async(req, res)=>{
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (user){
        return res.json({status: 'ok', user: true});
    }else{
        return res.json({status: 'error', user: false});
    }
})

app.get('/hello', (req, res)=>{
    res.send("Hello World")
})


app.listen(PORT, (req, res)=>{
    console.log("Server started on port", PORT);
})