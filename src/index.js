const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

const Filme = mongoose.model('Filme', { 
    title: String,
    description: String,
    image_url: String,
    trailer_url: String 
});

app.get("/",async(req, res) => {
    const films = await Filme.find(); 
    res.send(films);
});

app.post("/", async(req, res) => {
    const filme = new Filme({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    await filme.save();
    res.send(filme);
});

app.listen(port, () => {
    mongoose.connect("mongodb+srv://<USUARIO>:<SENHA>@starwars-api.yqflmju.mongodb.net/?retryWrites=true&w=majority");
    console.log("App running")
});

app.delete("/:id", async(req, res) => {
    const film = await Filme.findByIdAndDelete(req.params.id);
    return res.send(film);
});

app.put("/:id", async(req, res) => {
    const film = await Filme.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    }, {
        new: true
    });
    return res.send(film);
});

