// app.js
const express = require('express');
const app = express();

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const csv = require('csv-parser');
const csvWriter = createCsvWriter({
  path: 'BooksFile.csv',
  header: [
    { id: 'name', title: 'name' },
    { id: 'cost', title: 'cost' },
    { id: 'number', title: 'number' },
    { id: 'topic', title: 'topic' },
    { id: 'id', title: 'id' }
  ]
});
const data = [
    { name: 'How to get a good grade in DOS in 40 minutes a day', cost: 30, number: 5,topic:'distributed systems',id:1 },
    { name: 'RPCs for Noobs', cost: 25, number: 4,topic:'distributed systems',id:2 },
    { name: 'Xen and the Art of Surviving Undergraduate School', cost:1 , number: 7,topic:'undergraduate school ',id:3 },
    { name: 'Cooking for the Impatient Undergrad', cost:9 , number: 8,topic:'undergraduate school ',id:4 }
  ];

  csvWriter
  .writeRecords(data)
  .then(() => console.log('The CSV file was written successfully'));

  
  const csv1 = require('csvtojson');

async function retrieveDataFromCSV(filename, name) {
    try {
        const jsonArray = await csv1().fromFile(filename);
        const filteredData = jsonArray.filter(item => item.topic === name);
        if (filteredData.length === 0) {
            throw new Error(`No data found for ${name}`);
        }
        return filteredData;
    } catch (error) {
        throw error;
    }
}
async function retrieveBookFromCSV(filename, name) {
    try {
        const jsonArray = await csv1().fromFile(filename);
        const filteredData = jsonArray.filter(item => item.id === name);
        if (filteredData.length === 0) {
            throw new Error(`No data found for ${name}`);
        }
        return filteredData;
    } catch (error) {
        throw error;
    }
}


// Function to write data x number of times into a CSV file
async function writeToFile1(filename,  id) {
    try {
        // Read data from the CSV file
        const jsonArray = [];
        fs.createReadStream(filename)
            .pipe(csv())
            .on('data', (data) => jsonArray.push(data))
            .on('end', async () => {
                jsonArray.forEach(book => {
                    if (book.id === id) {
                        book.number -= 1;
                    }
                });

                const csvWriter = createCsvWriter({
                    path: filename,
                    header: Object.keys(jsonArray[0]).map(key => ({ id: key, title: key })),
                });

                await csvWriter.writeRecords(jsonArray);

                console.log('The CSV file was updated successfully');
            });
    } catch (error) {
        console.error('Error writing to CSV:', error);
    }

}


async function retrieveQuantityFromCSV(filename, name) {
    try {
        
        const jsonArray = await csv1().fromFile(filename);
        let filteredData = jsonArray.filter(item =>item.id === name);
        if (filteredData.length === 0) {
            throw new Error(`No data found for ${name}`);
        }
       
        if(filteredData[0].number>0){
        await writeToFile1 ('BooksFile.csv',  filteredData[0].id)
      return filteredData[0].name;
        //decrement
        
        }
         else return "n"
    } catch (error) {
        throw error;
    }
}
// Example usage

 /*
 retrieveDataFromCSV()
    .then((data) => {
        console.log(`Data for ${nameToRetrieve}:`, data);
    })
    .catch((error) => {
        console.error(error.message);
    });

*/


app.get('/search?', (req, res) => {
    const { topic } = req.query;
    retrieveDataFromCSV('BooksFile.csv',topic)
    .then((data) => {
        console.log(`Data for ${topic}:`, data);
        res.send(data);
    })
    .catch((error) => {
        console.error(error.message);
    });
    
});

app.get('/search/:BookID', (req, res) => {
    let BookID=req.params.BookID
    console.log(BookID)
    retrieveBookFromCSV('BooksFile.csv',BookID)
    .then((data) => {
        console.log(`Data for ${BookID}:`, data);
        res.send(data);
    })
    .catch((error) => {
        console.error(error.message);
    });
    
});

app.get('/quantity/:BookID', (req, res) => {
    let BookID=req.params.BookID
    console.log(BookID)
    retrieveQuantityFromCSV('BooksFile.csv',BookID)
    .then((data) => {
        console.log(`Data for ${BookID}:`, data);
        res.send(data);
    })
    .catch((error) => {
        console.error(error.message);
    });
    
});
const port =  3002;
app.listen(port, () => {
    console.log(`Server ready at: http://localhost: ${port}`);
});
