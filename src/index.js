const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


// Post Method to Save USER
app.post('/users', (req, res)=>{
    const user = User(req.body)

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})


//Get Method to Search all User
app.get('/users', (req, res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})


//Get method to search single User
app.get('/users/:id', (req, res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{      
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{  
        res.status(500).send()
    }) 
})


// Here Starts the TASK part


//Post Methos to creat a single user
app.post('/tasks', (req, res)=>{
    const task = Task(req.body)
    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/tasks/:id', (req, res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{      
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{  
        res.status(500).send(e)
    }) 
})

app.get('/tasks', (req, res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.send(e)
    })
})

app.listen(port, ()=>{
    console.log('Server runing on: '+ port)
})