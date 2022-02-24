const express = require('express');
const  sum  = require('lodash');
const router = express.Router();


router.get('/sol1', function(req, res) {

    let arr=[1,2,3,5,6,7]
     let sum=0
    
    for(let i=0;i<arr.length;i++){
        sum += arr[i]
    }
    let lastDigit=arr.pop()
    let totalSum=lastDigit*(lastDigit+1)/2
    let missingNumber=totalSum-sum
    
        res.send( {data: missingNumber} )
})
    


router.get('/sol2', function(req, res) {

    let arr2=[33,34,35,37,38]
    let len=arr2.length
    let total=0
    for(let i=0;i<arr2.length;i++){
        total +=arr2[i]
    }
    let first=arr2[0]
    let last=arr2.pop()
    let consecutNumber=(len+1)*(first+last)/2
    let missingNumber2=consecutNumber-total
    res.send( {data:missingNumber2} )

})



let players=[]
 router.post('/players', function(req, res){
            let playerName=req.body
            let name=playerName.name
            for(let i=0;i<players.length;i++){
              if(players[i].name==name){
                res.send("player already exist")
              }
            }
            players.push(playerName)
         res.send( { data:players, status:true} )
           
        
     
 })



 router.post('/players/:playerName/bookings/:bookingId', function(req, res){
    let name=req.params.playerName
    let isPlayerPresent=false
    
    for(let i=0;i<players.length;i++){
      if(players[i].name==name){
        isPlayerPresent=true
      }
    }
     if(!isPlayerPresent){
     return res.send("player not found")  
    }
    
    let booking=req.body
    let bookingId=req.params.bookingId
    for(i=0;i<players.length;i++){
      if(players[i].name==name){
        for(let j=0;j<players[i].bookings.length;j++){
          if(players[i].bookings[j].bookingNumber==bookingId){
            res.send("bookingId already present in players bookings")
          }
        }
          players[i].bookings.push(booking)
          
        }
      }
      res.send(players)

 })
  




module.exports = router;

// Ensure the below conditions:

// 1. PlayerName and bookingId are path params You have to ensure the playerName received must exist in the players
//  collection. If the playerName doesn’t exist in the players collection return an error message that says something
//   relevant about player not being found. 

// 2. For a valid playerName check if the bookingId is already present in the player’s booking. Again,
//  for a repeated bookingId send an error message conveying the booking was already processed.
//   For a relevant bookingId(which is new), add the booking object from request body to bookings array