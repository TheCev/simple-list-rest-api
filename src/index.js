//IMRORTS MODULES

const express = require('express'); //import express
const bodyParser = require('body-parser')
const app = express(); //start express


//Settings
app.set('port', process.env.PORT || 3000)//set port
app.use(express.json())

//Routes
app.use('/users',require('./app/routes/users')) //users routes
app.use('/users', require('./app/routes/lists')) //lists routes
app.use('/users', require('./app/routes/tasks'))
//Start Server
app.listen(app.get('port'), () => {
	
	console.log(`Server is Running on Port:${app.get('port')}`);
})