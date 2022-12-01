import config from "../config";
import mongoose from "mongoose";

export default function () {
    const mongoUri = `mongodb+srv://${
        config.DB_USERNAME
    }:${
        config.DB_PASSWORD
    }@${
        config.DB_HOSTNAME
    }?retryWrites=true&w=majority`;
    mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        dbName: config.DB_NAME
    });
}
