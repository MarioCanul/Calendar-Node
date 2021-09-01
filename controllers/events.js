const { response } = require("express");
const Evento = require('../models/Evento')
const getEventos = async(req, res = response) => {

  const getEventos=await Evento.find().populate('user','name')
  res.status(200).json({
    ok: true,
    msg: "getEventos",
    getEventos
  });
};

const crearEvento = async(req, res = response) => {
  const evento= new Evento(req.body)

  try {
    evento.user=req.uid;
 const eventoGuardado= await evento.save()
 res.status(200).json({
  ok: true,
  eventoGuardado
});

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:'Hable con el admin'
    })
  }

};

const actualizarEvento = async(req, res = response) => {
const id = req.params.id;
const uid=req.uid;
try {
  const evento= await Evento.findById(id);
  if (!evento) {
    res.status(404).json({
      ok:false,
      msg:'Evento no existe por ese id'
    })
  }

  if (evento.user.toString()!== uid) {
    return res.status(401).json({
      ok:false,
      msg:'No tiene privilegios para este evento'
    })
  }

  const nuevoEvento={
    ...req.body,
    user:uid
  }
  const eventoActualizado=await Evento.findByIdAndUpdate(id,nuevoEvento,{new:true});

  res.status(200).json({
    ok:true,
    evento:eventoActualizado,
  })
} catch (error) {
  console.log(error)
  res.status(500).json({
    ok:false,
    msg:'Hable con el admin'
  })
}
};

const eliminarEvento = async(req, res = response) => {
  const id = req.params.id;
  const uid=req.uid;
  try {
    const evento= await Evento.findById(id);
    if (!evento) {
      res.status(404).json({
        ok:false,
        msg:'Evento no existe por ese id'
      })
    }
  
    if (evento.user.toString()!== uid) {
      return res.status(401).json({
        ok:false,
        msg:'No tiene privilegios para este evento'
      })
    }
  
    const eventoActualizado=await Evento.findByIdAndDelete(id);
  
    res.status(200).json({
      ok:true,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok:false,
      msg:'Hable con el admin'
    })
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
