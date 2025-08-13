const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../midelware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

requestRouter.post("/request/send/:status/:userId", userAuth, async (req, res) => {

    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;

        //1. Define an array of allowed status values
        const allowedStatus = ["ignored", "intrested"];
        // Check if the provided status is not included in the allowed status list
        if (!allowedStatus.includes(status)) {
            // If status is invalid, return a 400 Bad Request response 
            // with an error message indicating the invalid status
            return res.status(400).json({ message: "invalid status Type " + status })
        }
        // 2.Ensure the target user (toUserId) exists in our database , Prevents sending connection requests to non-existent users
        const toUser = await user.findById(toUserId);
        if(!toUser){
        return res.status(404).json({
        message: "Target user not found - connection request failed"
        });
        }
        // 3. Check if a connection request already exists between these users
        // We look for either:
        // => Any existing request where the fromUserId is the current toUserId (reverse request)
        // => An exact match where fromUserId and toUserId match the provided pair
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                // {fromUserId , toUserId}, // Case 1: Reverse request exists
                // {fromUserId :toUserId ,toUserId :fromUserId }// Case 2: Exact same request exists

                // Case 1: Normal request (A→B)
                { fromUserId: fromUserId, toUserId: toUserId },

                // Case 2: Reverse request (B→A)
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        // If an existing connection request is found
        if (existingConnectionRequest) {
            // Return 400 Bad Request with error message to prevent duplicate requests
            return res.status(400).send({ message: "Connection request already exists" })
        };

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        console.log('connectionRequest', connectionRequest);
        const data = await connectionRequest.save();
        console.log('data', data);
        res.json({
            message: "Connection Request send succesfully",
            data,
        })
    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
});

module.exports = requestRouter;