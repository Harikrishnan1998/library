const express = require('express');
const adminaRouter= express.Router();
const AuthorData = require('../model/AuthorData');

function router(nav){
    adminaRouter.get('/',function(req,res){
        
        res.render('addauthor',{
            nav,
            title: 'library'
            
        });
    });
    adminaRouter.post('/add',function(req,res){

        var item = {
            
            name :req.body.name,
            genre:req.body.genre,
           image: req.body.image

        };
        
        
        var author =AuthorData(item)  ;
        author.save();
        console.log(req.body);
        res.redirect('/authors');
        
        });

    return adminaRouter;

}
module.exports=router;
