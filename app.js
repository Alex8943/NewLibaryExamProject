if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser"); //import body-parser
const indexRouter = require("./controllers/index"); //import index.js from controllers folder
const authorRouter = require("./controllers/authors"); //import authors.js from controllers folder

app.set("view engine", "ejs"); // set view engine to ejs, so we can use ejs files
app.set("views", __dirname + "/views"); //tell where to find the views
app.set("layout", "layouts/layout"); //tell where to find the layout file, such as header and footer

app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false}));

//connect to mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { 
useNewUrlParser: true})
const db = mongoose.connection
db.on("error", error => console.error(error));
db.once("open" , () => console.log("Connected to Mongoose"));


app.use("/", indexRouter); //use index.js from routes folder (imported above")
app.use("/authors", authorRouter); //use authors.js from routes folder (imported above")

app.listen(3000, () => console.log('Server running on port 3000')); //