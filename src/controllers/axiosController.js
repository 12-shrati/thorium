let axios=require('axios')
const { query } = require('express')
const { get } = require('lodash')


let byDistrictId=async function(req,res){
    try{
    let id = req.query.district_id
    let date=req.query.date
    // console.log(`query params are:${id} ${date}`)
    let options={
        method:"get",
        url:`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
    }
    let result=await axios(options)

    let data=result.data
    res.status(200).send({msg:data})
}catch(error){
    res.status(500).send({msg:error})
}
}


let cityWether=async function(req,res){
    try{
        let city=req.query.city
        let key = req.query.key
                    
    console.log(`query params are:${city} ${key}`)
    let options={
        method:"get",
        url:`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    }
    let result=await axios(options)
    let data=result.data     
    res.status(200).send({msg:data})
}catch(error){
    res.status(500).send({msg:error})
}
}


let sortedCities=async function(req,res){
    try{
        // let key = req.query.key
    let cities=["Bangluru","Mumbai","Delhi","Kolkatta","Channai","London","Mascow"]
    let citiesArray=[]
    
    for(i=0;i<cities.length;i++){
       let city=cities[i]
         city=req.query.city

    let obj={city:cities[i]}
    let result=await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ebd4a4a3d104a4650d2dd6527b7c8957`)
    console.log(result.data.main.temp)
    obj.temp=result.data.main.temp
    citiesArray.push(obj)
    }
    let sorted=citiesArray.sort((a,b)=>{return a.temp-b.temp})
    console.log(sorted)
    res.status(200).send({status:true,data:sorted})
    }
    catch(error){
        res.status(500).send({msg:error})
    }
}




let memesText=async function(req,res){
    try{
         let memesId=req.query.memesId
         let text0=req.query.text0
         let text1=req.query.text1
         let options={
             method:"post",
             url:`https://api.imgflip.com/caption_image?template_id=${memesId}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
         }
         let result=await axios(options)
         res.status(200).send({data:result.data})
    }

catch(error){
    res.status(500).send({msg:error})
}
}



module.exports.byDistrictId=byDistrictId
module.exports.cityWether=cityWether
module.exports.sortedCities=sortedCities
module.exports.memesText=memesText