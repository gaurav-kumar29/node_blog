const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
const { render } = require('express/lib/response');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://gk292002:gaurav2002@nodetuts.sbq6g.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

// //listen for requests
// app.listen(3000);

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// })

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// //mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('61f03d181d90c593e08461eb')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err)
//         });
// });

//routes
app.get('/', (req, res) => {
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // //res.send('<h1>Hello Express!</h1>');// Since we are using express, we can use res.send() so now we dont have to declare content type of header nor do we need to set statusCode manually
    // //res.sendFile('./views/index.html', {root: __dirname});//sendFile expects the absolute path and not the relative path so we specify the root directory to the current directory of the project
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');//just for the sake of this tutorial
});

app.get('/about', (req, res) => {
    //res.send('<h1>About Page</h1>');  
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', { title: 'About' });
});



//blog routes
app.use('/blogs', blogRoutes);


// //redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// });

//404 page
app.use((req, res) => { // app.use is a middleware which is executed for every request i.e when none of the routes above match the this is executed
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', { title: '404' });
});