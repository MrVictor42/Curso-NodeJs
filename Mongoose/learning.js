const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/learning', {
}).then(() =>{
    console.log('MongoDB connected')
}).catch((error) =>{
    console.log('Error:' + error)
});

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true 
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    country: {
        type: String,
    }
});

mongoose.model('users', UserSchema);
const user = mongoose.model('users');

new user ({
    name: 'Victor',
    last_name: 'Mota',
    email: 'victor@gmail.com',
    age: 24,
    country: 'Brazil'
}).save().then(() => {
    console.log('User save with success!');
}).catch((error) =>{
    console.log('Error: ' + error);
});