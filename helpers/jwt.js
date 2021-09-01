const jwt=require('jsonwebtoken');

const generarJWT=(uid,name)=>{
console.log(uid,name)
    return new Promise((resolve,reject)=>{
        const payload={uid,name}
        jwt.sign(payload,process.env.JWT_SIGN,{
            expiresIn:'2h'
        },(err,token)=>{
            if (err) {
                console.log(err)
                reject('no se pudo generar el JWT')
            }
            resolve(token);
        });
    })
}
module.exports={
    generarJWT
}