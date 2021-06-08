//Imports Modules
const express = require('express') //express
const dbConnection = require('../../db/db'); // Database Connection 

const router = express.Router() //express router

//Routes for user

//GET ALL USERS
router.get('/',async(req, res) => {

	await dbConnection.query(`SELECT * FROM users`,(err,rows,fields) => {
		if (err) { //if there's a error, logs
			console.err(err)
		}else{
			//if there isn't a error, show data
			res.json(rows)
		}
	})
	
})

//GET A USER
router.get('/:userId', async (req,res) => {

	const {userId} = req.params; //get user_id

	//select the user with the id
	await dbConnection.query('SELECT * FROM users WHERE user_id = ?',[userId], (err,rows,fields) => {
		
		if(err){
			console.log(err)
		} else {
			res.json(rows[0])
		}
	})


})

//CREATE A USER
router.post('/', async (req,res) => {

	const {username,password,email} = req.body;

	const newUser = {
		username,
		password,
		email
	}

	await dbConnection.query('INSERT INTO users set ?',[newUser],(err,rows) => {

		if (err) {
			throw err
		}else{
			res.redirect('/')
			console.log('se ha registrado un nuevo usuario')
		}
	})
})

//DELETE USER
router.delete('/:userId', async (req, res) => {

	const { userId } = req.params

	await dbConnection.query('DELETE FROM users WHERE user_id = ?',[userId],(err,rows) => {

		if (err) {
			throw err

		} else {
			console.log('have deleted the user with the id ' + userId)
			res.redirect('/')
		}
	})
})

//Update user
router.put('/:userId', async (req,res) => {

	const {username,password,email} = req.body;
	const { userId } = req.params
	const newUser = {
		username,
		password,
		email
	}

	await dbConnection.query('UPDATE users set ? where user_id = ? ',[newUser,userId],(err,rows) => {

		if (err) {
			throw err
		}else{
			res.redirect('/')
			console.log('se ha editado un usuario')
		}
	})
})
module.exports = router //exports routes

