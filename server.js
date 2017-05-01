const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.port || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method}: ${request.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('no file found');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        name: 'Aditibtp',
        pageTitle: 'Home Page'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
         pageTitle: 'Projects'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to full this request'
    });
})

app.listen(port, function(){
    console.log(`Server up on port ${port}`);
});