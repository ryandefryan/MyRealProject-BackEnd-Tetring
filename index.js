// Initialize All Packages
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const authenticRouter = require('./routers/AuthenticRouter.js') 

// Initialize Body Parser 
app.use(express.json())

// Initialize PORT
const PORT = 4000

// Root Route
app.get('/', (req, res) => {
    res.send('Authentic System "Ready"')
})
app.use('/authentic-system', authenticRouter)

app.listen(PORT, () => console.log('API RUNNING ON PORT ' + PORT))