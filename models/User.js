const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Complaint = require('./Complaint')

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    register_date:{
        type:Date,
        default:Date.now()
    }   
})

// UserSchema.virtual('complaints',{
//     ref:'Complaint',
//     localField:'_id',
//     foreignField:'author'
// })

module.exports = User = mongoose.model('User',UserSchema)