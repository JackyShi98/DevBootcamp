const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data Imported Successfully'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

// Delete Data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Destroy Successfully'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argy[2] === '-d') {
    deleteData();
}