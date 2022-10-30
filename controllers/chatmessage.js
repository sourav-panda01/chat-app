const Chatmessage = require("../models/chatmessage");
const User = require("../models/user")
var onlineusers=[]

exports.postchat = (req, res, next) => {
  const { message } = req.body;
  console.log(req.body,"inside post chat controller")
  if (message == undefined || message.length === 0) {
    return res.status(400).json({ err: "Parameters Missing" });
  } else {
    Chatmessage.create({ message :message,userId:req.user.id})
      .then((result) => {
        res.status(201).json({ message: "Message Sent", success: true });
      })
      .catch((err) => {
        res.status(500).json({ err: "Something went wrong" });
      });
  }
};

exports.getchat = async(req, res, next) => {
  //{where:{userId:req.user.id}}
  try{
    onlineusers.push(req.user.id)
    console.log("Online users",onlineusers)
    var data=[]
    console.log("Inside try of getchat")
    let chatresponse=await Chatmessage.findAll()
    //console.log(chatresponse,"This is chat response")
    for(let i=0;i<chatresponse.length;i++){
      console.log("---",chatresponse[i].userId)
      let userresponse= await User.findAll({where:{id:chatresponse[i].userId}})
      //console.log(userresponse.length,"User response length")
      //console.log(userresponse[0].name,"name")
      data[i]=userresponse[0].name+"------>  "+chatresponse[i].message
      //console.log(data[i],"This is the data sent")

    }
    console.log("This is final data",data)
    res.status(201).json({data:data,message:"Chat data sent", success: true})
  }
  catch(err){
    console.log(err)
  }
};




exports.logout = async(req, res, next) => {
  console.log("inside logout controller")
  var userindex=onlineusers.indexOf(req.user.id)
  onlineusers.splice(userindex,1)
  console.log(onlineusers,"Current online user length")
  res.status(201).json({message:"logout done"})
}