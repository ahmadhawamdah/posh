// load any env variables in bashrc, current enviroment, or .env file 
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = `mongodb+srv://sailboat:B7d6u2VxlFDZlZ5Y@posh-challenges.qb5s8.mongodb.net/explore`;
// const MONGO_URI =  `mongodb+srv://utopianseries:Utopia13579@cluster0.zlpujqa.mongodb.net/test`
const SERVER_PORT = process.env.SERVER_PORT ? Number (process.env.SERVER_PORT) : 1337;
const GEOCODE_API = "AIzaSyCpIOVDZjO3ticyztoIT2803s9TOVhl9_Y";
export const config = {
    mongo: {
        uri: MONGO_URI
    },
    server: {
        port: SERVER_PORT
    },
    geocode: {
        api: GEOCODE_API
    }
}