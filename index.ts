import express from "express"
const app = express(); 
import remindersRouter from "./routers/reminders"
import cors from "cors"


app.use("/reminders", remindersRouter); 

app.use(cors());
app.use(express.json()); 


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(express.json());



app.listen(3000, () => {console.log("Server is running on port 3000")});