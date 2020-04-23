const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

//Post Method to creat a single task
router.post('/tasks',auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Get methos to read task by ID
router.get('/tasks/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        if (e.name === "CastError") {
            return res.status(404).send()
        }
        res.status(500).send(e)
    }
})

//GET /tasks?sortBy=createdAt
//GET /tasks?limit
//GET tasks?completed=true
//Get method to read all Task
router.get('/tasks',auth, async (req, res) => {
    const match ={}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]]= parts[1] === 'desc' ? -1: 1
    }
    try {
        // const tasks = await Task.find({owner: req.user._id}) this thing also works
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.send(e)
    }
})

// to update a task
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isAllowed = updates.every((update) => allowedUpdate.includes(update))

    if (!isAllowed) {
        res.status(400).send({
            error: "invalid updates!"
        })
    }
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        return res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send("task not found")
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router