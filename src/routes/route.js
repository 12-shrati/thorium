const express = require('express');
const router = express.Router();

// 1.
router.get('/movies', function(req, res) {
        res.send('["dabang","race","toofaan","queen","badla"]')
})

// 2. /3.
router.get('/movies/:movieId', function(req, res) {
  movie=["dabang","race","toofaan","queen","badla"]
  let value=req.params.movieId;
  if(value>movie.length-1){
      res.send('"use valid index"')
    }else{
        res.send(movie[value])
    }
})



    // 4.
    router.get('/films', function(req, res) {
        res.send([ {id:1,name:'the shining'},{id:2,name:'Incendies'},{id:3,name:'rang de basanti'},{id:4,name:'finding demo'} ])
    }) 
    
    
    // 5.
    router.get('/films/:filmId', function(req, res) {
     let films=[ {id: 1,name: 'the shining'},{id: 2,name: 'Incendies'},{id: 3,name: 'rang de basanti'},{id: 4,name: 'finding demo'} ]
     let value=req.params.filmId;
     let found=false;
     for(i=0;i<films.length;i++){
         if(films[i].id==value){
             found=true;
             res.send(films[i])
             break
         }
     }
    });

module.exports = router;