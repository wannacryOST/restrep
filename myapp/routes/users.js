var express=require('express');
var router=express.Router();
var chatHistory=[];
var nicknames=[];

router.get('/',function(req,res,next){
    res.json({message:'fhschat-appapiworks...'});
});

router.get('/history',function(req,res,next){
    res.send(chatHistory);
});

router.post('/history',function(req,res,next){
    var date= new Date();
    let showNickname = true;
    if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].nickname === req.body.nickname) showNickname = false
    chatHistory.push({message: req.body.message, nickname: req.body.nickname, timestamp: req.body.timestamp, type: req.body.type, showNickname: showNickname});
    res.json({message:'Historycreated!'});
});

module.exports=router;