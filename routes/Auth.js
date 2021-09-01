// host http://localhost:4000/api/Auth
const {Router}=require('express');
const {check}=require('express-validator')
const router=Router();

const {registrarUsuario,
    loginUsuario,
    revalidarToken
}=require('../controllers/Auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { valdiarJWT } = require('../middlewares/validarjwt');

router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El Email es obligatorio').isEmail(),
    check('password','El password debe ser mayor a 6 caracteres').isLength({min:6}),
    validarCampos
], 
registrarUsuario
)
router.post('/',[
    check('email','El Email es obligatorio').isEmail(),
    check('password','El password debe ser mayor a 6 caracteres').isLength({min:6}),
    validarCampos
], 
loginUsuario
)
router.get('/renew',valdiarJWT ,revalidarToken)
module.exports=router

