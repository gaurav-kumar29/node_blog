//app.js is doing all this functionality in a much easier way so we wont use this file
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method);

    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello')
    })

    greet();
    greet();

    //set header content type
    res.setHeader('Content-Type', 'text/html');

    // res.write('<head><link rel="stylesheet" href="#"></head>')
    // res.write('<p>hello world</p>');
    // res.write('<p>hello world again</p>');
    // res.end()

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }
        else{
            //res.write(data); // if we are passing only one thing then we can directly write it in res.end()
            res.end(data);
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
});

//whenever you clone a node project always run 'npm install' first to install all the dependencies because whenever the code is shared, the node_modules is not shared