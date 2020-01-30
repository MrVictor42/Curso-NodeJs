var http = require('http');

http.createServer(function(req, res){
    res.end('Hey');
}).listen(8081);

console.log('Running Server!')