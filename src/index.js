import express from 'express';
const app = express();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiroutes from './routes/routes.js';
import { PORT, DB_URL } from './config/serverConfig.js'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/hoonar', apiroutes);

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('connected to database');
    } catch (error) {
        console.log('Could not connect to MongoDB', error);
    }
}

const setUpAndStartServer = () => {
    app.listen(PORT, async ()=> {
        console.log(`Server started at PORT: ${PORT}`);

        await connectToDB();
    })
}
setUpAndStartServer();
