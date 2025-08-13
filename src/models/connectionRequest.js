const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            require:true,
        },
        toUserId:{
          type: mongoose.Schema.Types.ObjectId,
          require: true,  
        },
        status:{
            type: String,
            required:true,
            enum:{
                values:['ignored', 'intrested','accepted', 'rejected'],
                message:`{VALUE} is incorrect status type`
            }
        },
    },
    {
        timestamps:true
    }
);
    //Logic : cannot send friend request to yourself 
    connectionRequestSchema.pre("save", function (next){
        const connectionRequest = this;
        // check if sender or reciver id is same then not able to send request to youself
        if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
           throw new Error("cannot send friend Request to Yourself")
        }
     });


    const ConnectionRequestModel = new mongoose.model(
        "ConnectionRequest",
    connectionRequestSchema,
    );

module.exports = ConnectionRequestModel;