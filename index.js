const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const path = require("path");
const bodyParser = require('body-parser')



const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useunifiedTopology:true,
    useNewUrlParser:true,
}).then(() => console.log('mongodb connected'))
.catch(error => console.log(error));


app.get('/', (req,res) => {
    res.send('hi');
})
app.use( require('./routes/userRoute'))

if(process.env.NODE_ENV ==="production" ){
    app.use(express.static("client/build"));
    app.get("*", () => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('server is running on port 4000');
})