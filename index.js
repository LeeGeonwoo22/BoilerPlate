const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://corepen:abcd1234@boilerplate.cvbef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{
  // useNewUrlParser : true,
  // useUnifiedTopology : true,
})
  .then(()=> console.log(`MongoDB connected`))
  .catch(err => console.log(err))
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})