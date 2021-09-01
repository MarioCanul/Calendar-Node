const { response } = require("express");
const bcryp = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");
const registrarUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(500).json({
        ok: false,
        msg: "El usuario ya existe en la BD",
      });
    }
    usuario = new Usuario(req.body);

    //  encriptar contraseña
    const salt = bcryp.genSaltSync();
    usuario.password = bcryp.hashSync(password, salt);
    await usuario.save();

    //generar jwt
    const token =await generarJWT(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el administrador",
    });
  }
};
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(500).json({
        ok: false,
        msg: "El usuario no existe ",
      });
    }

    //confirmar password
    const validPass = bcryp.compareSync(password, usuario.password);

    if (!validPass) {
      return res.status(500).json({
        ok: false,
        msg: "Contraseña no Coincide",
      });
    }
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      msg: "Login",
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      msg: "Porfavor hable con el administrador",
    });
  }
};

const revalidarToken = async(req, res = response) => {
 const uid=req.uid;
 const name=req.name;
 const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token
  });
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  revalidarToken,
};
