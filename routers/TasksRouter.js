const express = require('express')
const Router = express.Router()
const tasksController = require('./../controllers/TasksController.js')

Router.post('/create-task', tasksController.createTask)
Router.post('/get-all-tasks', tasksController.getAllTasks)
Router.delete('/delete-task/:idTask', tasksController.deleteTask)
Router.patch('/update-task-done/:idTask', tasksController.updateTaskDone)

module.exports = Router