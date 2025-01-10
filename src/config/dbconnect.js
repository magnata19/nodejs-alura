import mongoose from "mongoose";

const connectDataBase = async () => {
     mongoose.connect(process.env.DB_CONNECTION_STRING);
    return mongoose.connection;
};

export default connectDataBase;