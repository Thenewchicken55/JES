const express = require('express');
const { readFile } = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', (request, response) => {

    response.sendFile(path.join(__dirname, '/home.html'));

    // readFile('./home.html', 'utf8', (err, html) => {
    //     if (err) {
    //         response.status(500).send('Sorry, we are facing some issues');
    //     }
    //     response.send(html);
    // });
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});