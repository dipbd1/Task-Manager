const mongoose = require('mongoose')
require('../src/db/mongoose')

const User = require('../src/models/user')

// ObjectId("5e959675813ff60cb8e014a8")


// User.findByIdAndUpdate("5e96c05cbe7ac2031029b318", {
//     age: 1
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({
//         age: 1
//     })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)

// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {
        age
    })
    const count = await User.countDocuments({
        age
    })
    return count
}

updateAgeAndCount("5e959675813ff60cb8e014a8", 2).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})