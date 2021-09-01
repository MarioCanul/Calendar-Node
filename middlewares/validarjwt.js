const {response}=require('express')
const jwt=require('jsonwebtoken')
const valdiarJWT=(req,res=response,next)=>{
const token=req.header('x-token')
if (!token) {
    res.status(401).json({
        ok:false,
        msg:'no hay token'
    })
}
try {
    const {uid,name}=jwt.verify(
        token,
        process.env.JWT_SIGN
    );
req.uid=uid;
req.name=name;

} catch (error) {
    return res.status(401).json({
        msg:'token no valido'
    })
}

    next()
}
module.exports={
    valdiarJWT  
}