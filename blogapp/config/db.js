if(process.env.NODE_ENV == 'production') {
    module.exports = {
        mongoURI: 'mongodb://victormota:bgatahkei42@blogapp-prod-pptww.mongodb.net/test?retryWrites=true&w=majority'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/blogapp'
    }
}