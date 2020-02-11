const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/learning', {
    useMongoClient: true
}).then(() =>{
    console.log('MongoDB connected')
}).catch((error) =>{
    console.log('Error:' + error)
});