const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter= require('./routers/task')

const app = express()
const port = process.env.PORT

//---------- Test Area --------------


//---------- Test Area --------------
app.use(express.static('src/public'))

app.get('/', (req, res) => {
    res.send();
});

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server runing on: ' + port)
})