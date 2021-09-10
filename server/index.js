const express = require('express')
const app = express()
const port = 8000
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require('./middleware/auth')
const { User } = require('./ models/Users')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  // 에러같은것들이 안뜨기 위해 쓰는거라고함. 
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


// 기본 route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get(`/api/hello`,(req,res) =>{
  res.send("안녕하세요")
})
//회원가입 route
app.post('/api/users/register', (req, res) => {
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
app.post('/api/users/login', (req, res) => {

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
        // 쿠키("쿠키이름",유저토큰) 쿠키에 유저토큰이 저장이됨. 
        res.cookie("x_auth",user.token) 
            .status(200)
            .json({
              loginSucess: true, 
              userId : user._id})
      })
    })
  })
})

// role 1 어드민 role 2 특정부서어드민
// role 0 ->일반유저 role 0이 아니면 관리자. 

app.post('/api/users/auth',auth, (req,res)=>{
  
  // 여기 까지 미들웨어 통과를 했다는 것은 Authentication이 true 라는 말이다.
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role ===0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.userlastname,
    role : req.user.role,
    image : req.user.image
  })
})

app.get('/api/users/logout',auth,(req, res)=>{
  User.findOneAndUpdate(
    { _id :req.user._id},
    {token : ""},
    (err,user) => {
      if(err) {
        return res.json({success :false, err});
      }
        return res.status(200).send({
          success : true
        })
    })
  })

  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})