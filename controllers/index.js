

const express = require('express');
const router = express.Router();
const Book = require("../models/book"); //import book model
const bcrypt = require("bcrypt"); 
const passport = require("passport"); //import passport
const flash = require("express-flash"); 
const session = require("express-session"); //import express-session
const methodOverride = require("method-override"); 




const initializePassport = require("./passport-config");

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);


const users = []

router.use(express.urlencoded({ extended: false })) //we want to use our data from forms to use them in our post methods
router.use(flash())
router.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride("_method")) //we want to use method-override to use delete and put methods in our forms

// All top 10 Books
router.get("/", async (req, res) => {
    //We need to check if the user is admin or not.
    let books
    try{
        books = await Book.find().sort({createdAt: "desc"}).limit(10).exec()
    }catch{
        books = []
    }
    res.render("login", {books: books})
});

// All top 10 Books
router.get("/user-login", async (req, res) => {
    //We need to check if the user is admin or not.
    let books
    try{
        books = await Book.find().sort({createdAt: "desc"}).limit(10).exec()
    }catch{
        books = []
    }
    res.render("index", {books: books})
});

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

router.get("/login", (req, res) => {
    res.render("login") 
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/register", (req, res) => {
    res.render("register")
});


router.delete('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});


router.post("/register", async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect("/login")
       }catch{
            res.redirect("/register")
            res.send("Something went wrong")
       }
        console.log(users)
}); 



function checkAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect("/login")
}   


module.exports = router; //export router so we can use it in app.js
module.export = { checkAuthenticated }
