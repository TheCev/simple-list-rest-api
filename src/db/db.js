//Import Mysql module
const mysql = require('mysql');

//Keys for mysql
const keys = {
	host:'bqubtioq9kctknwrnqe0-mysql.services.clever-cloud.com',
	user:'ucvcj0qcrsp01mat',
	password:'mMTmRKH9b4KeGes8UFCc',
	database:'bqubtioq9kctknwrnqe0',
	port:3306
}

//Create Connection
const database = mysql.createPool(keys);

//Export dbConnection
module.exports = database