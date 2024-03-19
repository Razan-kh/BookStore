// app.js
const express = require('express');
const app = express();
const axios = require('axios');
const catalog = 'http://localhost:3002';
app.post('/order/:BookID', async (req, res) => {
    let BookID=req.params.BookID
    console.log(BookID)
    try {
        const response = await axios.get(`${catalog}/quantity/${BookID}`);
      
        if(response.data==="n") res.send(" The item is out of stock ")
        else res.send(`bought book ${response.data}`)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error server' });
    }
   
});

const port = 3003;
app.listen(port, () => {
    console.log(`Server ready at: http://localhost: ${port}`);
});
