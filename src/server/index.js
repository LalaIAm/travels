const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html')
})

app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`)
})