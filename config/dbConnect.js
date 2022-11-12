const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://Admin:ly0t3qh89xUMkwq4@cluster0.m8gao9l.mongodb.net/?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;