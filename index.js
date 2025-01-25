const express = require('express');
const app = express();
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//reading ./files dir and showing it on front-end
app.get('/', function (req,res) {
    fs.readdir('./files', function (err, files) {
        res.render("index", {files: files});
    })
});

//Input form handling and writing into file using fs,
app.post('/create', function (req, res) {
    const {title, details} = req.body;
    fs.writeFile(`./files/${title.split(' ').join('')}.txt`, details, function (err) {
        res.redirect('/');
    })
})

//reading the content of the file,
app.get('/file/:filename',function (req, res) {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function (err, data) {
        res.render('show', {filename: req.params.filename, filedata: data});
    })
})


//edit filename
app.get('/edit/:filename', function (req, res) {
    res.render('edit',{filename: req.params.filename});
})
app.post('/edit', function (req, res) {
    const {previousname, newname} = req.body;
    fs.rename(`./files/${previousname}`,`./files/${newname}.txt`, function (err) {
        res.redirect('/');
    })
})


//delete feature
app.get('/delete/:filename', function (req, res) {
    fs.unlink(`./files/${req.params.filename}`, function (err) {
        res.redirect('/');
    })
})

app.listen(3000); 