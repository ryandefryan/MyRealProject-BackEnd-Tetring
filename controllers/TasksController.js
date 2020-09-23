const db = require('../database/MySQL.js');
const jwt = require('jsonwebtoken')



// ############### CREATE TASK ###############
const createTask = (req, res) => {
    // Step1. Ambil Semua Data Value
    // Step2. Validasi Data Value
    // Step3. Hashing Password
    // Step4. Store Data Value To Database

    const data = req.body
    const token = data.token
    
    if(!data.task || !data.description || !token) return res.json({
        error : true,
        message : 'Data Must Be Filled / Token Not Found'
    })

    jwt.verify(token, '123abc', (err, dataToken) => {
        try {
            if(err) throw err

            sqlQueryCheckAccount = `SELECT * from users where id = ? `
            db.query(sqlQueryCheckAccount, dataToken.id, (err, result) => {
                try {
                    if(err) throw err

                    if(result.length === 0){
                        res.json({
                            error : true,
                            message : 'Id / Account Not Found'
                        })
                    }else{
                        sqlQuery = `INSERT INTO tasks SET ?`
                        db.query(sqlQuery, {id_user : dataToken.id, task : data.task, description : data.description, date : data.date, time : data.time}, (err, result) => {
                            try {
                                if(err) throw err
    
                                res.json({
                                    error : false,
                                    message : 'Create Task Succesfull'
                                })
                            } catch (error) {
                                res.json({
                                    error : true, 
                                    message : error.message
                                })
                            }
                        })
                    }
                } catch (error) {
                    res.json({
                        error : true,
                        message : error.message,
                        detail : error
                    })
                }
            })
        } catch (error) {
            res.json({
                error : true,
                message : error.message,
                detail : error
            })
        }
    })
}



// ############### GET ALL TASKS ###############
const getAllTasks = (req, res) => {
    const data = req.body
    const token = data.token
    
    if(!token) return res.json({
        error : true,
        message : 'Token Not Found'
    })

    jwt.verify(token, '123abc', (err, dataToken) => {
        try {
            if(err) throw err

            sqlQuery = `SELECT * from tasks where id_user = ?`
            db.query(sqlQuery, dataToken.id, (err, result) => {
                try {
                    if(err) throw err

                    res.json({
                        error : false,
                        message : 'Get Data Succesfull',
                        detail : {
                            tasks : result
                        }
                    })
                } catch (error) {
                    res.json({
                        error : true,
                        message : error.message,
                        detail : error
                    })
                }
            })
        } catch (error) {
            res.json({
                error : true,
                message : error.message,
                detail : error
            })
        }
    })
}



// ############### DELETE TASK ###############
const deleteTask = (req, res) => {
    const id = Number(req.params.idTask)

    if(!id) return res.json({
        error : true,
        message : 'Id Task Not Found'
    })

    db.query('SELECT * FROM tasks WHERE id = ?;', id, (err, result) => {
        try {
            if (err) throw err

            if(result.length > 0){
                var sqlQuery = 'DELETE FROM tasks WHERE id = ?;'

                db.query(sqlQuery, id, (err, result) => {
                    try {
                        if (err) throw err

                        res.json({
                            error : false, 
                            message : 'Task Has Been Deleted'
                        })
                    } catch (error) {
                        res.json({
                            error : true,
                            message : error.message
                        })
                    }
                })
            }else{
                res.json({
                    error : true,
                    message : 'Task With Id ' + id + ' Has Not Found'
                })
            }
        } catch (error) {
            res.send(error.message)
        }
    })
}



// ############### TASK HAS BEEN DONE ###############
const updateTaskDone = (req, res) => {
    const id = Number(req.params.idTask)

    if(!id) return res.json({
        error : true,
        message : 'Id Task Not Found'
    })

    db.query('SELECT * FROM tasks WHERE id = ?;', id, (err, result) => {
        try {
            if (err) throw err

            if(result.length > 0){
                var sqlQuery = 'UPDATE TASKS SET status = 0 WHERE id = ?;'

                db.query(sqlQuery, id, (err, result) => {
                    try {
                        if (err) throw err

                        res.json({
                            error : false, 
                            message : 'Task Has Been Done'
                        })
                    } catch (error) {
                        res.json({
                            error : true,
                            message : error.message
                        })
                    }
                })
            }else{
                res.json({
                    error : true,
                    message : 'Task With Id ' + id + ' Has Not Found'
                })
            }
        } catch (error) {
            res.send(error.message)
        }
    })
}

module.exports = {
    createTask : createTask,
    getAllTasks : getAllTasks,
    deleteTask : deleteTask,
    updateTaskDone : updateTaskDone
}