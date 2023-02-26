const mongoose=require('mongoose');
const places=new mongoose.Schema({
	pname:{
		type:String,
		required:true,
	},
	imagelink:{
		type:String,
	},
	description:{
		type:String,
		required:true,
	}
})

const placesdb=mongoose.model('placesdb',places);
module.exports=placesdb;