const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ComaplaintSchema = new Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{
        type : String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    lattitude:{
        type: Number ,
        required: true
    },
    longitude:{
        type:Number ,
        required:true
    },
    date:{
        type: Date,
        default:Date.now()
    }
})

module.exports = Complaint = mongoose.model('Complaint',ComaplaintSchema)