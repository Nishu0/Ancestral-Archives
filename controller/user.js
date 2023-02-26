const bcrypt=require('bcryptjs')
const dotenv=require("dotenv");
const axios = require('axios')
require('dotenv').config();
const User = require("../models/user");
exports.create=async(req,res)=>{
    try{
		console.log("Register");
		const {name,email,password}=req.body;
		if(!(email&&password&&name)){
		  res.status(400).send("All field is require");
		}
		const oldUser=await User.findOne({email});
		if(oldUser){
			return res.status(401).send("User already exists");
		}
		if(password.length < 8){
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 8 characters'
			})
		}
		encryptedPassword=await bcrypt.hash(password,10);

		const user=await User.create({
			name,
			email:email.toLowerCase(),
			password: encryptedPassword,
		});
		res.redirect('/login');
    }
    catch(err){
		console.log(err);
	}
}

exports.login=async(req,res)=>
{
	try{
		const{email,password}=req.body;
		console.log("Login");
		if(!(email&&password)){
			return res.status(400).send("Email and password both required")
		}
		const user=await User.findOne({email});
		//console.log(user);
		const validPassword=await bcrypt.compare(password,user.password);
		if(validPassword){
			req.session.user_id=user._id;
			console.log(req.session.user_id);
			//return res.json({ status: 'ok', data: token })
            res.redirect('/');
		}
	}
	catch(err){
		console.log(err);
	}
}