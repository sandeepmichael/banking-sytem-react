const { async } = require('regenerator-runtime');
const historyModel = require('../models/historyModel');
const User = require('../models/userModel');
const {ObjectId} = require('mongodb');
const router = require('express').Router();



router.post('/adduser', async(req, res) => {
    try {
        const {name, email, amount, contact} = req.body;

         let user = await User.findOne({email});
         if(user){
            res.status(400).json({message:'user already exists'});
         }
         user = new User({
            name,
            email,
            contact,
            amount,
         })
         await user.save();
         res.status(200).json({message:'user added successfully'});
        
    } catch (error) {

        console.log(error);
        res.status(500).send();
    }
})


 router.get('/data', async(req, res) => {
    try {
        const data = await User.find({});
        //console.log(data)
        if(data){
            res.json(data);
        }else {
            res.status(500).send()
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
 })

 router.get('/view/:id', async(req, res) => {
    try {
       const id = req.params.id;
  
     console.log(id);
      const senderData = await User.findOne({"_id":id});
        console.log(senderData)
        const getalldata = await User.find();
        if(senderData && getalldata ){
        res.json({data:senderData, records:getalldata});
        }else {
            throw error;
        }
        
    } catch (error) {
        console.log(error);
    }
 })


 router.post('/transfer', async(req, res) => {
    try {
        const {name, email, receivername, receiveremail, transferamount, senderId, idData} = req.body;
        console.log(senderId, receivername, idData);

         const history = new historyModel({
            senderName:name,
            senderEmail:email,
            receiverName:receivername,
            receiverEmail:receiveremail,
            amount:transferamount,
         })

         const sender = await User.find({"email":email});
         console.log(sender);
         const receiver = await User.find({"name":receivername, "email":receiveremail});
         console.log(receiver);

         Promise.all([sender, receiver]).then(([senderData, receiverData]) => {
            console.log(senderData)
            senderData.forEach(async (c) => {
            if(c.name === receivername || c.email === receiveremail || c.amount < transferamount){
                    
                //res.render('sucess',{title: "sucess", value:"", msg: "", errmsg: "Process Not Complete due to incorrect reciver details!"});
                res.status(400).json({message:"unable to process"});
            }else {
                let updateAmount = parseInt(c.amount) - parseInt(transferamount);
                await User.findOneAndUpdate({"name" : name}, {"$set": {"amount": updateAmount}});
                history.save().then((r)=>{
                   
                }).catch(err => {console.log(err)});
                receiverData.forEach( async (e) => {
                    let updateAmount = parseInt(e.amount) + parseInt(transferamount);
                  
                    await User.findOneAndUpdate({"name": receivername}, {"$set": {"amount": updateAmount }})
                })
            }
            res.status(200).json({message:"transfer successful"});
        })
         })
        
    } catch (error) {
        console.log(error);
    }
 })


 router.get('/transfer', async(req, res) => {
    try {
        const historydata = await historyModel.find();
        if(historydata){
            res.json({data:historydata})
        }else {
            throw err;
        }

        
    } catch (error) {
        console.log(error)
    }
 })

 router.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const removeuser = await User.findByIdAndDelete({"_id":id});
        if(removeuser){
            res.json({data:removeuser})
        }else {
            throw err;
        }
        
    } catch (error) {
        console.log(error)
    }
 })

 router.get('/remove/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const Deletedata = await historyModel.findByIdAndDelete({"_id":id})
        if(Deletedata){
            res.json({data:Deletedata})
        }else {
            throw err;
        }
        
    } catch (error) {
        console.log(error);
    }
 })

module.exports = router;