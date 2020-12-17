const express = require('express');
const authorRouter = express.Router();
const AuthorData = require('../model/AuthorData');
function router(nav){

//     var authors = [
//     {
//        title: 'William Shakespeare',
//        genre:'Plays',
//        img:'wshp.jpg'
// },
// {
//    title: 'Anne Rice',
//    genre:'Fiction',
//    img:'anne.jpg'
// },
// {
//    title: 'Judith Krantz',
//    genre:'Romance',
//    img:'judith.jpg'
// },]

authorRouter.get('/',function(req,res){
   AuthorData.find()
   .then(function(authors){
   res.render("authors",{
       nav,
       title:'Library',
       authors//books array
      });
   });
});

authorRouter.get('/:id',function(req,res){  
   const id = req.params.id     
   AuthorData.findOne({_id: id})
   .then(function(author){
   res.render('author',{
        nav,
        title:'Library',
        author //pass index
      }) 
   })
});
authorRouter.get('/update/:id',function(req,res){
   const id = req.params.id   
   res.render("updatea",{
       nav,
       title:'Library',
      //books array
      });
   });
   // booksRouter.get('/delete/:id',function(req,res){
   //    const id = req.params.id   
   //    res.render("delete",{
   //        nav,
   //        title:'Library',
   //       //books array
   //       });
   //    });
      authorRouter.get('/delete/:id',function(req,res){
         const id = req.params.id
         AuthorData.remove({_id: id}, 
            function(err, docs){
         if(err) res.json(err);
         else    res.redirect('/authors');
         });
         });   

      authorRouter.post('/update/:id',function(req,res){

      
   
         const id = req.params.id
         AuthorData.findByIdAndUpdate({_id: id},{
            
            name :req.body.name,
            genre:req.body.genre,
           image: req.body.image},
           
           
            
           function(err, docs){
               if(err) res.json(err);
               else    
               
               res.redirect('/authors');
               });
               }); 


    return authorRouter;
}

module.exports = router;