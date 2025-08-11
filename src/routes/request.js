const express = require("express");
const requestRouter = express.Router();

const {userAuth} = require("../midelware/auth");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:userId", userAuth ,async (req , res)=>{

    try{
        // const fromUserId = req.body._id;
        const fromUserId = req.user._id;
        // const toUserId = req.params.toUserId;
        const toUserId = req.params.userId;

        const status = req.params.status;

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        console.log('connectionRequest', connectionRequest)
        const data = await connectionRequest.save();
        res.json({
            message:"Connection Request send succesfully",
            data,
        })
    }catch(err){
        res.status(400).send("ERROR :" + err.message );
    }
});

module.exports = requestRouter;