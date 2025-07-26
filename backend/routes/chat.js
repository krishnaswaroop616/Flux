const express=require("express");
const Thread =require("../models/Thread");
const getGeminiResponse=require("../utils/gemini");

const router=express.Router();

router.get("/thread",async(req,res)=>{
    try{
        const threads=await Thread.find({}).sort({updatedAt:-1});
        res.status(201).json(threads);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching threads"});
    }
});

router.get("/thread/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
        const response=await Thread.findOne({threadId});
        if(!response){
            return res.status(404).json("Chat not found");
        }
        res.status(201).json(response.messages);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching chat"});
    }
});

router.delete("/thread/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
        const thread=await Thread.findOne({threadId});
        if(!thread){
            return res.status(404).json({message:"Chat not found"});
        }
        await Thread.findOneAndDelete({threadId});
        res.status(200).json({message:"Chat deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error deleting chat"});
    }
});

router.post("/chat",async(req,res)=>{
    const {threadId,message}=req.body;
    if(!threadId || !message){
        return res.status(400).json({message:"Missing required fields"});
    }
    try{
        let thread=await Thread.findOne({threadId});
        if(!thread){
            thread=new Thread({
                threadId,
                title:message,
                messages:[{
                    role:"user",
                    content:message
                }],
            });
        }
        else{
            thread.messages.push({
                role:"user",
                content:message
            });
        }
        const reply= await getGeminiResponse(message);
        thread.messages.push({
            role:"assistant",
            content:reply
        });
        thread.updatedAt=new Date();
        await thread.save();
        res.json({reply:reply});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching chat"});
    }
})


module.exports=router;