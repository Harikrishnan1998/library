const mongoose = require('mongoose');//access mongoose
const passportLocalMongoose = require('passport-local-mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://userone:userone@hkfiles.rh7e8.mongodb.net/libraryapp?retryWrites=true&w=majority');//connect db
const Schema = mongoose.Schema;//schema define

const Usera = new Schema({

    username: String,
    password :String,
    
});
Usera.plugin(passportLocalMongoose);
const User = mongoose.model('userdata',Usera);//model creation

module.exports = User;