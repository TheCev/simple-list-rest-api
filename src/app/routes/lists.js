//ROUTES FOR LISTS

//IMPORT MODULES
const express = require('express')	//express
const dbConnection = require('../../db/db') //database connection

const router = express.Router()	//express router

//ROUTES

//GET ALL OF USER'S LIST
router.get('/:userId/lists', async (req, res) => {

	const { userId } = req.params	//get UserId from request params

	//Get all of lists with this userId
	await dbConnection.query('SELECT * FROM lists WHERE user_id = ?',[userId],(err,rows,fields) => {

		if (err) {	//if there's a error, log error
			console.error(err)

		} else { //else, show data
			res.json(rows)
		}
	})
})

//GET ONLY ONE OF USER'S LIST 
router.get('/:userId/lists/:listId', async (req, res) => {

	const { userId, listId } = req.params; //get userId and listId from request params

	//Get The list, which userId and ListId are these
	await dbConnection.query('SELECT * FROM lists WHERE list_id = ? AND user_id = ?',[listId,userId], (err, rows)  => {

		if (!err) { //if there isn't an error, show data
			res.json(rows[0])
		} else { //else, show the error
			console.log(err)
		}
	})
})

//ADD LIST
router.post('/:userId/lists', async (req,res) => {
	console.log(req.params)
	const { userId } = req.params //get userId from request params
	const {title} = req.body //get list properties from request body
	const newList = {
		"list_title":title,
		"user_id":userId
	}
	await dbConnection.query('INSERT INTO lists SET ?', [newList], (err,rows) => {

		if (!err) {//if, there isn't an error, send successfully message
			console.log('have added a list to the user, which userId = ' + userId)
			res.sendStatus(204)

		} else { //else, show error
			console.error(err)
		}
	})
})

//DELETE LIST
router.delete('/:userId/lists/:listId', async (req, res) => {

	const { userId,listId } = req.params //get userID and listId from request params

	//delete the task, wich userId and listId are these
	await dbConnection.query('DELETE FROM lists WHERE user_id = ? AND list_id = ?',[userId,listId],(err,rows) => {

		if (!err) {//if, there isn't an error, send succesfully message
			console.log('have deleted a list, which userId =' + userId + ' and listId =' + listId)
		} else {	//else, show the error
			console.error(err)
		}
	})
})

//UPDATE LIST
router.put('/:userId/lists/:listId', async (req, res) => {

	const { userId,listId } = req.param;	//get userId and listId from request params
	const { title } = req.body; 	//get properties list from request body

	//edit the list's  properties, which userId and ListId are these
	await dbConnection.query('UPDATE lists SET list_title = ? WHERE list_id = ? AND user_id = ?',[title,listId,userId],(err,rows) => {

		if (!err) {//if there isn't a error, send succesfully message
			console.log(`have edited a list, which userId = ${userId} and listId = ${listId}`)
		} else {//else, show the error
			console.error(err)
		}
	})
})
module.exports = router //exports routes
