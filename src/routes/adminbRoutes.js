const express = require('express');
const adminbRouter= express.Router();
const BookData = require('../model/BookData');

function router(nav){
    adminbRouter.get('/',function(req,res){
        
        res.render('addbook',{
            nav,
            title: 'library'
            
        });
  
    });
    adminbRouter.post('/add',function(req,res){

        var item = {
            title :req.body.title,
            author :req.body.author,
            genre:req.body.genre,
           image: req.body.image

        };
        
        
        var book =BookData(item)  ;
        book.save();
        console.log(req.body);
        res.redirect('/books');
        
        });

    return adminbRouter;

}
module.exports=router;
