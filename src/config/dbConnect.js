import mongoose from 'mongoose';

async function conectaDatabse(){
    mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection;
}

export default conectaDatabse;