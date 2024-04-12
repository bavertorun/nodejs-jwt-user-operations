const { connect } = require("mongoose")

module.exports = async () => {

    try {
        await connect(process.env.MONGO_CONNECTION_URI || 'mongodb://localhost:27017',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MONGODB Connected!');
    } catch (error) {
        console.error(error);
        process.exit(1)
    }

}