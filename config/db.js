const mongoose  =require("mongoose");
const MONGO = process.env.MONGODB_URL;

const dbConn = async () => {
    try {
        await mongoose.connect(
            MONGO,
            {useNewUrlParser: true, useUnifiedTopology: true,}
        );
        console.log("Connected to MongoDB.")
    }
    catch(e){
        console.log(e);
        throw e;
    }
}

module.exports = dbConn;