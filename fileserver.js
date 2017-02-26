"use strict";
const express = require('express');
const app = express();


const PORT = process.env.PORT || 80;


app.use(express.static('public'));


app.get('/examples/:dir/:file*', function(req, res){

    res.sendFile(req.params.file, {
        root: 'examples/' + req.params.dir,
    });
    // res.send('hai');

});


app.listen(PORT, function(){

    console.log('Example server started');

});