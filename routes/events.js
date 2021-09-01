// http://localhost:4000/api/Calendar
const {Router}=require('express');
const {check}=require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { getEventos,
     crearEvento, 
     actualizarEvento, 
     eliminarEvento } = require('../controllers/events');
const { valdiarJWT } = require('../middlewares/validarjwt');
const { isDate } = require('../helpers/isDate');
// todas tienen que pasar por validar el token
const router=Router();

router.use(valdiarJWT)
router.get('/', getEventos)
router.post('/',
[
     check('title','El titulo es obligatorio').not().isEmpty(),
     check('start','La fecha de inicio es obligatoria').custom(isDate),
     check('end','La fecha de Finalizacion es obligatoria').custom(isDate),
     validarCampos
],
crearEvento)
router.put('/:id' ,actualizarEvento)
router.delete('/:id' ,eliminarEvento)
module.exports=router