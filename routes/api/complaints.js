const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const multer = require('multer')

const Complaint = require('../../models/Complaint')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' )
    {
        cb(null, true)
    }
    else{
        cb(null, false)
    }
}

const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter:fileFilter
})

router.get('/',(req,res)=>{
    Complaint.find()
    .sort({date : -1})
    .then(complaints => res.json(complaints))
})


router.get('/:id',(req,res)=>{
    Complaint.findById(req.params.id)
    .then(complaint => res.json(complaint))
    .catch(err => res.status(404).json({error:"Complaint Not Found"}))

})

router.get('/pastcomplaints',auth,(req,res)=>{
    console.log("req.user")
    Complaint.find({author:req.user.id})
    .then(complaints => res.json(complaints))
    .catch(err => res.status(201).json({msg:"No complaints found"}))

})


router.post('/',auth,upload.single('image'),(req,res)=>{
    const newComplaint = new Complaint({
        author:req.user.id,
        title:req.body.title,
        description:req.body.description,
        address:req.body.address,
        image:req.file.path ,
        lattitude:req.body.lattitude,
        longitude: req.body.longitude
    })

    newComplaint.save()
    .then(complaint => res.json(complaint))
})


router.delete('/:id',auth,(req,res)=>{
    Complaint.findById(req.params.id)
    .then(complaint => complaint.remove().then(()=>res.json({success:true})))
    .catch(err => res.status(404).json({success:false}))

})




module.exports = router