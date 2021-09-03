const { User } = require('../ models/Users')


let auth =(req,res, next)=>{

    // 인증처리 하는곳
    // 1. 쿠키를 가져옴 클라이언트에서
    let token = req.cookies.x_auth;
    
    // 2. 토큰을 복호화한후 유저를찾음
    User.findByToken(token, (err,user)=>{
        if(err) {
            throw err;
        }
        if(!user) {
            return res.json({
                isAuth : false,
                error : true
            })
        }
        req.token = token;
        req.user = user;
        next();
    })
    // 3 . 유저가 있으면 인증 okay
    //     없으면 인증 No
}
module.exports={ auth }