import express from "express";
const app = express();
import cors from "cors"
import fetch from "node-fetch"


const frontendURL = "http://localhost:5173"; 

app.use(cors({ origin: frontendURL }));

app.get('/', async (req, res) => {
    try {
        const response = await fetch(frontendURL);
        console.log('API response status:', response.status);

        if (!response.ok) {
            console.error('API response error:', response.statusText);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const data = await response.text();
        console.log(data)
        res.send(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); 
    

app.listen(3000, () => console.log('Server running on port 3000')); //