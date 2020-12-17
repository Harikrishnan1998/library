const express = require('express');
const app = express();
var mongoose = require("mongoose"), 
passport = require("passport"), 
 bodyParser = require("body-parser"),
 LocalStrategy = require("passport-local");
 const passportLocalMongoose =  require("passport-local-mongoose"); 
        const User = require('./src/model/user');

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect('mongodb+srv://userone:userone@hkfiles.rh7e8.mongodb.net/libraryapp?retryWrites=true&w=majority');
const port = process.env.PORT || 5000;
const nav = [
    {
        link:'/books',name:'Books'
    },
    {
        link:'/authors',name:'Authors'
    },
    {
        link:'/adminb',name:'Add Book'
    
    },
    {
        link:'/admina',name:'Add Author'

    },
    {
        link:'/logout',name:'Logout'
    }
   
];
const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorRouter= require('./src/routes/authorRoutes')(nav);
// const loginRouter = require('./src/routes/loginRoutes')(nav);
const adminbRouter = require('./src/routes/adminbRoutes')(nav);
const adminaRouter = require('./src/routes/adminaRoutes')(nav);
// const updateRouter = require('./src/routes/updateRoutes')(nav);
// const deleteRouter = require('./src/routes/deleteRoutes')(nav);

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'))//access static files
app.set('view engine','ejs');
app.set('views',__dirname+'/src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/books',booksRouter);
app.use('/authors',authorRouter);
app.use('/adminb',adminbRouter);
app.use('/admina',adminaRouter);
app.use(passport.initialize()); 
app.use(passport.session()); 
  
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());
// app.use('/update',updateRouter);
// app.use('/delete',deleteRouter);
// app.use('/signup',loginRouter);

app.get('/',function(req,res){
    res.render("index",
    {
        nav,
        title:'Library'
    });
});
app.get("/books", isLoggedIn, function (req, res) { 
    res.render("books"); 
}); 
  

app.get("/register", function (req, res) { 
    res.render("register",{
        nav,
        title:'Library'
});
});
  

app.post("/register", function (req, res) { 
    var username = req.body.username 
    var password = req.body.password
    User.register(new User({ username: username }), 
            password, function (err, user) { 
        if (err) { 
            console.log(err); 
            return res.render("register",{
                nav,
                title:'Library'}); 
        } 
  
        passport.authenticate("local")( 
            req, res, function () { 
            res.redirect('/login');
        }); 
    }); 
}); 
  

app.get("/login", function (req, res) { 
    res.render("log",{
        nav,
        title:'Library'
});
});


 
  

app.post("/login", passport.authenticate("local", { 
    successRedirect: "/books", 
    failureRedirect: "/login"
}), function (req, res) { 
}); 
  

app.get("/logout", function (req, res) { 
    req.logout(); 
    res.redirect("/"); 
}); 
  
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/books"); 
} 

 
app.listen(port);
