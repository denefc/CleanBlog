const express = require("express");
const mongoose=require('mongoose')

const ejs=require("ejs");
const path = require("path");
const Post=require('./models/Post')

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
});


//templates engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//Routes
app.get("/", async (req, res) => {
  const posts=await Post.find({})
  res.render("index",{
    posts,
  });
});
app.get("/posts/:id", async(req, res) => {
  const id=req.params.id;
  const post=await Post.findById(id);
  res.render("post",{
    post,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.post("/posts", (req, res) => {
  Post.create(req.body)
  res.redirect("/")
});
app.get("/add_post", (req, res) => {
  res.render("add_post");
});





const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
