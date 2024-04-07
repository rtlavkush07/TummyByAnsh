const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://AnshRathore:Ansh114@cluster0.rnavur2.mongodb.net/TummyCravings?retryWrites=true&w=majority&appName=Cluster0";

const MongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray()
        .then(data => {
            // console.log("Fetched data:", data);
            global.food_items= data;
            // console.log(food_items)
        })
        .catch(error => {
            console.log("Error:", error);
        });
         
        const foodCategory = await mongoose.connection.db.collection("foodCategory");

        foodCategory.find({}).toArray()
        .then(catData => {
            // console.log("Fetched data:", catData);
            global.foodCategory= catData;
            // console.log(food_items)
        })
        .catch(error => {
            console.log("Error:", error);
        }); 



    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = MongoDB;
