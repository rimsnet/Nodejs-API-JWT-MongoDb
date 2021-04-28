const router = require('express').Router();
const User   = require('../models/User');

//Validation
const Joi = require('joi');

const schema = Joi.object().keys({
    name:Joi.string()
    .min(6)
    .required(),
    email: Joi.string()
    .email()
    .min(6)
    .required(),
    password: Joi.string()
    .min(6)
    .required()
});

router.post('/register', async (req,res)=>{
  
    //validate the data before data add
    const {error} = schema.validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
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