// const mongoose = require('mongoose');
// // const dotenv = require('dotenv');
const { connect, connection } = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/socialnetworkDB');
// dotenv.config();
// mongoose.set('strictQuery', true);

// const connectDB = async () => {
//     try {
//         await 
        // mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB',{
        //     userNewUrlParser: true,
        //     useUnifiedTopology: true,
//         });
//             console.log('Success! You are now connected to MongoDB.');
//     } catch (err) {
//         console.error('Error! Cannot connect to MongoDB', err);
//         process.exit(1);
//     }
// };

const connectionString = 'mongodb://localhost:27017/socialnetworkDB';

connect(connectionString);

module.exports = connection;

// module.exports = mongoose.connection;