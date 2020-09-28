const express = require('express')
const Router = express.Router()
const tasksController = require('./../controllers/TasksController.js')

Router.post('/create-task', tasksController.createTask)
Router.post('/get-all-tasks', tasksController.getAllTasks)
Router.delete('/delete-task/:idTask/:myTkn', tasksController.deleteTask)
Router.patch('/update-task-done/:idTask/:myTkn', tasksController.updateTaskDone)

module.exports = Router