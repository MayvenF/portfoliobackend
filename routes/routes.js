const express = require('express')
const nodemailer = require('nodemailer');

const router = express.Router()
const cors = require('cors')
router.use(cors())


const ProjModel = require('../model/project')
const BlogModel = require('../model/blog')
const ContactModel = require('../model/contact')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: 'maeven.fanebust@gmail.com',
        pass: process.env.MAILER_PASS
    }
})

//Get all blogs method
router.get('/blogs', async (req, res) => {
    try {
        const data = await BlogModel.find();
        res.json(data)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/blogs/:id', async (req, res) => {
    try {
        const data = await BlogModel.findById(req.params.id)
        res.json(data)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

//Get all projects Method
router.get('/projects', async (req, res) => {
    try {
        const data = await ProjModel.find();
        res.json(data).status(200)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
})

//Post contact Method (ANY TIME YOU QUERY A DB, YOU MUST ASYNC/AWAIT)
router.post('/contact', async (req, res) => {
    var curId = 0
    try {
        if (await ContactModel.countDocuments() != 0){
        // auto-increment the id - get all contact ids, sort descending order, get first (returns array of one obj with id value)
            const data = await ContactModel.find({}, '_id').sort({_id: -1}).limit(1)
            curId = data.find(x => x != undefined)._id + 1
        }
    } catch(err){
        console.log(err)
    }


    const contact = new ContactModel({
        _id: curId,
        name: req.body.name,
        email: req.body.email,
        dateContacted: req.body.dateContacted,
        message: req.body.message,
        replied: req.body.replied

    })


    try{
        const dataToSave = contact.save();
        res.status(200).json(dataToSave)
    } catch (err){
        res.status(400).json({message: err.message})
    }

  
     // automatic email using nodemailer
     var mailOptions = {
        from: 'maeven.fanebust@gmail.com',
        to: req.body.email,
        subject: `Thanks for getting in touch, ${req.body.name}`,
        text: `${req.body.name},\n\nThank you for taking the time to write. I'd love to talk, and I'll get back to you as soon as I can.\n\nAll the best,\nMaeven`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })        

})

module.exports = router