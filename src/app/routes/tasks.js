//ROUTES FOR TASKS

//IMPORT MODULES
const express = require('express') //express
const dbConnection = require('../../db/db') //database connection

const router = express.Router() //express router

//ROUTES
const route = '/:userId/lists/:listId/tasks'
//GET ALL OF LIST'S TASKS s
router.get(route, async (req, res) => {

	const { userId, listId } = req.params; //get userId and listId from request params

	//Get Tasks, which userId and ListId are these
	await dbConnection.query('SELECT * FROM tasks WHERE list_id = ? AND user_id = ?',[listId,userId], (err, rows)  => {

		if (!err) { //if there isn't an error, show data
			res.json(rows)

		} else { //else, show the error
			console.log(err)
		}
	})
})

//GET ONLY ONE A TASK
router.get(`${route}/:taskId`, async (req, res) => {

	const { userId, listId, taskId } = req.params; //get taskId, userId and listId from request params

	//Get the task, which taskId, userId and ListId are these
	await dbConnection.query('SELECT * FROM tasks WHERE task_id = ? AND list_id = ? AND user_id = ?',[taskId,listId,userId], (err, rows)  => {

		if (!err) { //if there isn't an error, show data
			res.json(rows[0])

		} else { //else, show the error
			console.log(err)
		}
	})
})
//ADD TASK TO A LIST 
router.post(route, async (req, res) => {

	const { userId, listId } = req.params //get userId and listId from reques params
	const { taskTitle } = req.body //get task properties from request body

	const newTask = { //create task object

		"list_id":listId,
		"user_id":userId,
		"task_title":taskTitle
	}

	//ADD TASK WITH THESE PROPERTIES
	await dbConnection.query('INSERT INTO tasks SET ?',[newTask],(err,rows) => {

		if (!err) {//if, there isn't an error, send succesfully message
			console.log(`have been created a task, which userId = ${userId} and listId = ${listId}`)
			res.sendStatus(204)
		} else { //else, show the error
			console.error(err)
		}
	})
})

//EDIT TASK TITLE
router.put(`${route}/:taskId/title`, async (req, res) => {

	const { taskId, listId, userId } = req.params //get taskId, userId and listId from request params
	const { taskTitle } = req.body //get task title from request body

	//Edit task title, which taskId are this
	await dbConnection.query('UPDATE tasks SET task_title = ? WHERE task_id = ? AND list_id = ? AND user_id = ?',[taskTitle,taskId,listId,userId], (err,rows) => {

		if (!err) { //if there isn't an error, send succesfully message
			console.log(`have been edit title of task, which taskId = ${taskId}, listId = ${listId} and userId = ${userId}`)
			res.sendStatus(204)
		} else { //else, show the error
			console.error(err)
		}
	})
})

//MARK THE TASK
router.put(`${route}/:taskId/state`, async(req,res) => {

	const { taskId, userId, listId } = req.params //get taskId, listId and userId from request params

	//Change the state of task, which this taskId
	await dbConnection.query('SELECT * FROM tasks WHERE task_id = ? AND list_id = ? AND user_id = ?',[taskId,listId,userId],async(err,rows) => {

		if (!err) { //if there isn't an error, fetch the task state to change it

			const state = rows[0]["task_state"]

			if (state === 'N') {

				await dbConnection.query('UPDATE tasks SET task_state = "Y" WHERE task_id = ? AND list_id = ? AND user_id = ?',[taskId,listId,userId], (err,rows) => {

					if (!err) { //if there isn't an error, send succesfully message
						console.log(`have been marked as "done" a task, which taskId = ${taskId}, listId = ${listId} and userId = ${userId}`)
						res.sendStatus(204)
					} else { //else, show the error
						console.error(err)
					}
				})			
			} else {

				await dbConnection.query('UPDATE tasks SET task_state = "N" WHERE task_id = ? AND list_id = ? AND user_id = ?',[taskId,listId,userId], (err,rows) => {

					if (!err) { //if there isn't an error, send succesfully message
						console.log(`have been marked as "do" a task, which taskId = ${taskId}, listId = ${listId} and userId = ${userId}`)
						res.sendStatus(204)
					} else { //else, show the error
						console.error(err)
					}
				})
			}
		} else { //else, show the error
			console.error(err)
		}
	})
})

//DELETE A TASK
router.delete(`${route}/:taskId`, async(req,res) => {

	const { taskId, listId, userId } = req.params //get taskId, userId and listId from request params
	

	//delete the task, which taskId are this
	await dbConnection.query('DELETE FROM tasks WHERE task_id = ? AND list_id = ? AND user_id = ?',[taskId,listId,userId], (err,rows) => {

		if (!err) { //if there isn't an error, send succesfully message
			console.log(`have been deleted the task, which taskId = ${taskId}, listId = ${listId} and userId = ${userId}`)
			res.sendStatus(204)
		} else { //else, show the error
			console.error(err)
		}
	})
})


module.exports = router; 	//export router
