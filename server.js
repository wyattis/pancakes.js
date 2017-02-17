"use strict";
const express = require('express');
const app = express();


app.use(express.static('public'));


app.get('/examples/:dir/:file*', function(req, res){

    res.sendFile(req.params.file, {
        root: 'examples/' + req.params.dir,
    });
    // res.send('hai');

});


app.listen(process.env.PORT, function(){

    console.log('Example server started');

});