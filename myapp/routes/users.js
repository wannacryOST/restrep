var express=require('express');
var router=express.Router();
var chatHistory=[];
var usersToNicknames={};

router.get('/',function(req,res,next){
    res.json({message:'fhschat-appapiworks...'});
});

router.get('/history',function(req,res,next){
    res.send(chatHistory);
});


function addToHistory(message){
    let showNickname = true;
    if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].nickname === message.nickname && chatHistory[chatHistory.length - 1].type === 'message') showNickname = false
    chatHistory.push({message: message.message, nickname: message.nickname, timestamp: message.timestamp, type: message.type, showNickname: showNickname, userId: message.userId});
}
function handleUserChange(message){
    if (message.type == "exitUser"){
        delete usersToNicknames[message.userId]
        console.log(usersToNicknames)
    } else {
        usersToNicknames[message.userId] = message.nickname
        console.log(usersToNicknames)
    }
    
}

router.post('/history',function(req,res,next){
    if (req.body.type == "message") {
        addToHistory(req.body);
        res.json({message:'Historycreated!'});
    } else {
        addToHistory(req.body);
        handleUserChange(req.body);
        res.json({message:'Historycreated and user added!'});
    }
    return 
});

router.get('/users',function(req,res,next){
    res.send(usersToNicknames);
});
module.exports=router;