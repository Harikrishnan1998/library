const express = require('express');
const booksRouter = express.Router();
const BookData = require('..//model/BookData');
function router(nav){

//     var books = [
//     {
//        title: 'tom n jerry',
//        author:'bakdha',
//        genre:'anime',
//        img:'Tom.jpg'
// },
// {
//    title: 'harry potter',
//    author:'jk',
//    genre:'fantasy',
//    img:'harry.png'
// },
// {
//    title: 'pathuma',
//    author:'basheer',
//    genre:'drama',
//    img:'bash.jpg'
// },]

booksRouter.get('/',function(req,res){
   BookData.find()
   .then(function(books){
   res.render("books",{
       nav,
       title:'Library',
       books//books array
      });
   });
});

booksRouter.get('/:id',function(req,res){  
   const id = req.params.id     
   BookData.findOne({_id: id})
   .then(function(book){
   res.render('book',{
        nav,
        title:'Library',
        book //pass index
      }) 
   })
});
booksRouter.get('/update/:id',function(req,res){
   const id = req.params.id   
   res.render("update",{
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
      booksRouter.get('/delete/:id',function(req,res){
         const id = req.params.id
         BookData.remove({_id: id}, 
            function(err, docs){
         if(err) res.json(err);
         else    res.redirect('/books');
         });
         });   
      booksRouter.post('/update/:id',function(req,res){

      
   
         const id = req.params.id
         BookData.findByIdAndUpdate({_id: id},{
            
            title :req.body.title,
            author :req.body.author,
            genre:req.body.genre,
           image: req.body.image},
           
           
            
           function(err, docs){
               if(err) res.json(err);
               else    
               // BookData.save();
               res.redirect('/books');
               });
               }); 
      
           
            
         
         
   // booksRouter.put('/:id/update',function(req,res){  
   //    const id = req.params.id     
   //    BookData.findByIdAndUpdate({_id: id},{
         
   //       title :req.body.title,
   //       author :req.body.author,
   //          genre:req.body.genre,
   //         image: req.body.image

   //    })
   
      
   //    .then(function(books){            //access index or url /
   //    res.render('books',{
   //         nav,
   //         title:'Library',
   //         books //pass index
   //       }) 
   //  })
   // });

    return booksRouter;
}

module.exports = router;