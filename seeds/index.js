const mongoose = require('mongoose');
const cities = require('./cities');
const indianCities = require('./indianCities')
const { places, descriptors } = require('./seedHelpers');
const Hotel = require('../models/hotel');

mongoose.connect('mongodb://localhost:27017/get-hotel', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Hotel.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random200 = Math.floor(Math.random() * 200);
        const price = Math.floor(Math.random() * 2000) + 10;
        const camp = new Hotel({
            //YOUR USER ID
            author: '6088f81163b9bf52a80bb30d',
            starttime:'9am',
            endtime:'9pm',
            contact:9876543210,
            location: `${indianCities[random200].name}, ${indianCities[random200].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    indianCities[random200].lon,
                    indianCities[random200].lat,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/vaibhavjn/image/upload/v1619539827/getHotel/zsqa57qp7fuojdjyi8yo.jpg',
                    filename: 'getHotel/iiqdekzzefkwg7a74yp5'
                },
                {
                    url: 'https://res.cloudinary.com/vaibhavjn/image/upload/v1619539827/getHotel/zsqa57qp7fuojdjyi8yo.jpg',
                    filename: 'getHotel/iiqdekzzefkwg7a74yp5'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})