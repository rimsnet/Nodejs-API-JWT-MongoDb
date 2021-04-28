const router = require('express').Router();
const User   = require('../models/User');

//import validation from file
const {registerValidation} = require('../validation');




router.post('/register', async (req,res)=>{
  
    //validate the data before data add
    const {error} = registerValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    //checking if the user is already in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email Already exists');

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    });

    try{
        const saveUser = await user.save();
        res.send(saveUser);
    }catch(err){
        res.status(400).send(err)
    }

});



module.exports = router;