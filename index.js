const express = require('express');
const app = express();

const fs = require('fs');
let rawdata = fs.readFileSync('pics.json');
let pictures = JSON.parse(rawdata);


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

app.get('/', function (req, res) {
    return res.redirect("https://github.com/Christian-Martins/Codin-Anime-API");
});

app.get('/picture', function (req, res) {
    return res.json(pictures);
});

app.get('/picture/random', function(req, res){
    let id = Math.floor(Math.random() * pictures.pictures.length);
    let pic = pictures.pictures[id];
    res.json(pic);
});

app.get('/picture/id/:id', function(req, res){
    if(req.params.id < 0 || pictures.pictures.length <= req.params.id){
        res.statusCode = 404;
        return res.json({error: 404})
    }

    let pic = pictures[req.params.id];
    res.json(pic);
});

app.get('/picture/category/:cat', function(req, res){
    if(req.params.cat === isNaN || req.params.cat === null){
        res.statusCode = 404;
        return res.json({error: 404})
    }

    let language = "";
    let q = [];

    switch(req.params.cat){
        case("js"):
            language = "Javascript"; break;
        case("py"):
            language = "Python"; break;
        case("cpp"):
            language = "C++"; break;
        default:
            language = capitalizeFirstLetter(req.params.cat);
    }  

    for(let i = 0; i < pictures.pictures.length; i++){
        if(pictures.pictures[i].type === language){
            q.push(pictures.pictures[i])
        }
    }

    res.json(q);
})

app.get('*', function(req, res){
    res.statusCode = 404;
    return res.json({error: 404})
});

app.listen(process.env.PORT || 8080, () =>{
    console.log(`Codin'Anime API running on ${process.env.PORT}!`)
});