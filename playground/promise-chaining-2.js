const mongoose = require('mongoose')
require('../src/db/mongoose')
const Task = require('../src/models/task')

// ObjectId("5e9802576df70d29a4113a78")
// "5e90452ab09dfc2750f2529a"
// Task.findByIdAndDelete("5e90452ab09dfc2750f2529a").then((result)=>{
//     console.log(result)
//     return Task.countDocuments({completed:false})    
// }).then((result)=>{
//     console.log(result)    
// }).catch((e)=>{
//     console.log(e)    
// })

const deleteTaskandCount = async (id)=>{
    const task = Task.findByIdAndDelete(id)
    const count = Task.countDocuments({completed:false})
    return count
}

deleteTaskandCount("5e9802576df70d29a4113a78").then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})