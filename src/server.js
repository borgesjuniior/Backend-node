const express = require ('express');
const app = express()




app.get('/', (req, res) => {
    res.json({
        "hello": "Hello world 2"
    });
});


app.listen(3333, () => {
    console.log('Server has started!')
})