const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require(`cookie-parser`)
const config = require('./config/key')
const {User} = require('./ models/Users')

// 데이터를 분석해서 가져올수 있게 해줌. 
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
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

app.post('/login',(req,res)=>{
  // 요청된 이메일을 데이터베이스에서 있는지 확인 찾는다. 
  User.findOne({email : req.body.email}, (err,user) =>{
    if(!user) {
      return res.json({
        loginSucess : false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    user.comparePassword(req.body.password , (err, isMatch ) =>{
      if(!isMatch){
        return res.json({ 
          loginSucess : false, 
          message : "비밀번호가 틀렸습니다."
        })
      }
      user.generateToken((err,user)=>{
        if(err) {
          return res.status(400).send(err);
        }
        // 토큰을 저장한다. 어디에 쿠키, 로컬스토리지
        res.cookie("x_auth",user.token) 
            .status(200)
            .json({
              loginSucess: true, 
              userId : user._id})
      })
    })
  })
  // 요청한 이메일이 데이터베이스에 있다면 비밀번호가 같은지 확인 
  // 비밀번호 까지 맞다면 토큰을 생성하기.


})

})
app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})