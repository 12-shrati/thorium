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


let players=[{

    "name": "manish",
  
    "dob": "1/1/1995",
  
    "gender": "male",
  
    "city": "jalandhar",
  
    "sports": [
  
      "swimming"
  
    ],
  
    "bookings": [
        
  
      
  
    ]
  
  },
   
    
   {
  
    "name": "manish",
  
    "dob": "1/1/1995",
  
    "gender": "male",
  
    "city": "jalandhar",
  
    "sports": [
  
      "swimming"
  
    ],
  
    "bookings": [
    {
      
   "bookingumber": 1,
  
    "sportId": "",
  
    "centerId": "",
  
   "type": "private",
  
   "slot": "16286598000000",
  
   "bookedOn": "31/08/2021",
  
   "bookedFor": "01/09/2021"
    },
    
      
  {
  
   "bookingNumber": 2,
  
    "sportId": "",
  
    "centerId": "",
  
   "type": "private",
  
   "slot": "16286518000000",
  
   "bookedOn": "31/08/2001",
  
   "bookedFor": "01/09/2001"
  
  }
    
]
   },
  {
  
    "name": "gopal",
  
    "dob": "1/09/1995",
  
    "gender": "male",
  
    "city": "delhi",
  
    "sports": [
  
      "soccer"
  
    ],
  
    "bookings": [
       
  
    ]
  
  },
  
  {
  
    "name": "lokesh",
  
    "dob": "1/1/1990",
  
    "gender": "male",
  
    "city": "mumbai",
  
    "sports": [
  
      "soccer"
  
    ],
  
    "bookings": [
  
       
    ]
  
  },
     
  ]


 router.post('/players', function(req, res){
     
     
     
     for(let i=0;i<players.length;i++){
         let name=players[i].name
         if(name!=players[i].name){
            let ele=req.body.element
            players.push(ele)        
         res.send( { data:players, status:true} )
        }else{
            res.send("player already exist")
        }
    } 
 })



 router.post('/players/:playerName/bookings/:bookingId', function(req, res){
     let value=req.params.playerName;
     let id=req.params.bookingId
     for(i=0;i<players.length;i++){
         if(players[i].name!=value){
            res.send("player not found")
             break
         } if(players[i].name==value && players[i].bookings.bookingNumber==id){
             
             res.send("id already exist")
         }

         }
     
        


 })
  




module.exports = router;