const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const config = require('./config/key')
const {User} = require('./ models/Users')

// 데이터를 분석해서 가져올수 있게 해줌. 
app.use(bodyParser.urlencoded({extended : true}));

// json 타입으로된것을 분석해서 가져올수있게 넣어줌.
app.use(bodyParser.json());

mongoose.connect(config.mongoURI,
{
  // useNewUrlParser : true,
  // useUnifiedTopology : true,
})
  .then(()=> console.log(`MongoDB connected`))
  .catch(err => console.log(err))
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req,res)=>{
  // 회원가입할때 정보할당 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다. 
const user = new User(req.body)
user.save((err,doc)=>{
  // 에러가있을경우 에러메세지와 함께 전달해줌. 
  if(err) return res.json({success : false, err})
  return res.status(200).json({
    success : true
  })
})

})
app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})