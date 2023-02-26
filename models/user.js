const mongoose=require('mongoose');
const users=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		require:true,
		unique:true
	},
	password:{
		type:String,
		required:true,
		minlength:8
	}
})

const Userdb=mongoose.model('Userdb',users);
module.exports=Userdb;