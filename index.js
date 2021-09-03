const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { User } = require('./ models/Users')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())
app.use(cookieParser())

// 기본 route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//회원가입 route
app.post('/register', (req, res) => {
  // 회원가입할 때 필요한 정보를 client에서 가져옴
  const user = new User(req.body)
  // 가져온 정보를 데이터베이스에 저장
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

// 로그인 route
app.post('/login', (req, res) => {

  // 요청된 이메일을 데이터베이스에 존재하는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
    }

  // 요청된 이메일이 데이터베이스에 존재한다면 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      
      // 비밀번호까지 일치한다면 토큰 생성
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
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})