
const env = require('../../.env')

module.exports={
    mongoURI : `mongodb+srv://corepen:${env.MONGO_PASSWORD}@boilerplate.cvbef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}