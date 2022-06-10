const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');


//FOR READING STATIC FILES - CSS, JS ETC....
app.use('/',express.static(path.resolve(__dirname,'../dist')));

app.get('*',function(req,res){
    //res.send('Response from SERVER.JS file....'); // for dynamic content from server
    //FOR HTML
    const htmlFilePath=path.resolve(__dirname,'./../dist/dashboard.html');
    const readHtmlContent=fs.readFileSync(htmlFilePath,'utf-8');
    res.send(readHtmlContent);
});

// app.get('/',function(req,res){
//     //res.send('Response from SERVER.JS file....'); // for dynamic content from server
//     //FOR HTML
//     const htmlFilePath=path.resolve(__dirname,'./../dist/index.html');
//     const readHtmlContent=fs.readFileSync(htmlFilePath,'utf-8');
//     res.send(readHtmlContent);
// });


//FOR SERVER PORT LISTENING
app.listen(9000,function(){
    console.log('Node server is running on http://localhost:9000');
});