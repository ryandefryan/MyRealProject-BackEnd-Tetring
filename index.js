// Initialize All Packages
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const loggingAPI = require('./middleware/loggingAPI.js')
const authenticRouter = require('./routers/AuthenticRouter.js')
const tasksRouter = require('./routers/TasksRouter.js')

// Initialize Body Parser 
app.use(express.json())

// Initialize PORT
const PORT = 4000

// Root Route
app.get('/', (req, res) => {
    res.send('Authentic System "Ready"')
})
app.use(loggingAPI)
app.use('/authentic-system', authenticRouter)
app.use('/my-tasks', tasksRouter)

app.listen(PORT, () => console.log('API RUNNING ON PORT ' + PORT))