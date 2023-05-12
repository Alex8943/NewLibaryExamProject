const express = require('express');
const router = express.Router();
const Author = require("../models/author"); //import author model
const f = require('./index.js');




// All Authors Route
router.get('/', checkAuthenticated, async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const authors = await Author.find(searchOptions)
      res.render('authors/index', {
        authors: authors,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    }
  })

//New auther route
router.get("/new", checkAuthenticated, (req, res) => {
    res.render("authors/new", { author: new Author() })
});


//Create auther route (async)
router.post("/", checkAuthenticated, async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        //res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render("authors/new", {
            author: author,
            errorMessage: "Error creating Author"
        })
    }
});

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
      return next()
  }
  res.redirect("/login")
}  


module.exports = router; //export router so we can use it in app.js