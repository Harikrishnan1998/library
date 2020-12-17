const mongoose = require('mongoose');//access mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://userone:userone@hkfiles.rh7e8.mongodb.net/libraryapp?retryWrites=true&w=majority');//connect db
const Schema = mongoose.Schema;//schema define

const AuthorSchema = new Schema({

    
    name :String,
    genre:String,
    image: String
});

const AuthorData = mongoose.model('authordata',AuthorSchema);//model creation
module.exports = AuthorData;