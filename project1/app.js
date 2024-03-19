const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const catalogServerUrl = 'http://localhost:3002'; // Assuming catalog server runs on port 3001
const orderServerUrl = 'http://localhost:3003'; // Assuming order server runs on port 3002

app.use(bodyParser.json());

// Endpoint for searching books in the catalog
app.get('/search', async (req, res) => {
    const { topic } = req.query;
    console.log(topic)
    try {
        const response = await axios.get(`${catalogServerUrl}/search?topic=${topic}`);
       // const response = await axios.get(`${catalogServerUrl}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/search/:BookID', async (req, res) => {
    //const { BookID } = req.params;
    let BookID=req.params.BookID
    console.log(BookID)
    try {
        const response = await axios.get(`${catalogServerUrl}/search/${BookID}`);
       // const response = await axios.get(`${catalogServerUrl}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/order/:BookID', async (req, res) => {
    let BookID=req.params.BookID
    console.log(BookID)
    try {
        const response = await axios.post(`${orderServerUrl}/order/${BookID}`);
       // const response = await axios.get(`${catalogServerUrl}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
