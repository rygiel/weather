const weather = require('./weather');
const places = require('./places');
const express = require('express');
const app = express();
app.use(express.static('public'))
app.get('/weather', (req, res) => {
    const result = [];
    weather.fetch(places).subscribe((weather)=>{
        result.push(weather);
    }, (err)=>{
        res.status(400);
        res.send({
            error: 'something went wrong!'
        });
    }, () => {
        res.json(result);
    });
});

app.listen(3000, () => console.log('Weather app listening on port 3000!'));