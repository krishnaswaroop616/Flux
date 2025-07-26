const mongoose=require("mongoose");
const messageSchema=require("./Message");

const threadSchema=new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        default:"New Chat"
    },
    messages:[messageSchema],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});
const Thread=mongoose.model("Thread",threadSchema);

module.exports=Thread;