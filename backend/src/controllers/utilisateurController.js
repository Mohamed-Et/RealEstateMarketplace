const Utilisateur = require('../models/Utilisateur');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Op = require('sequelize').Op;
//get all
exports.getAll = async (req, res) => {
  try {
    const users = await Utilisateur.findAll({
      where: {
        status: {
          [Op.not]: 'deleted',
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.send(error);
  }
};
//get by ID
exports.getByID = async (req, res) => {
  const idUser = req.params.id;
  try {
    const user = await Utilisateur.findOne({
      where: { id: idUser },
    });
    res.status(200).json(user);
  } catch (error) {
    res.send(error);
  }
};
//register
exports.register = async (req, res) => {
  const { nom, login, pass } = req.body;
  //email validation
  if (!validator.isEmail(login)) {
    return res.status(400).json({ success: true, msg: 'Enter a valid Email!' });
  }
  //check if username is in use
  try {
    const existingUsers = await Utilisateur.findAll({
      where: { login: login },
    });
    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ success: true, msg: 'username already in use!' });
    }
  } catch (error) {
    res.send(error);
  }
  bcrypt.hash(pass, 10).then(async (hash) => {
    try {
      const newUser = await Utilisateur.create({
        nom: nom,
        login: login,
        pass: hash,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.send(error);
    }
  });
};
//login
exports.login = async (req, res) => {
  const { login, pass } = req.body;
  try {
    const user = await Utilisateur.findOne({
      where: { login: login },
    });
    if (user === null) {
      return res
        .status(400)
        .json({ success: true, msg: 'username or password are incorrect!' });
    }
    bcrypt.compare(pass, user.pass).then((valid) => {
      if (!valid) {
        return res.status(400).json({
          success: true,
          msg: 'username or password are incorrect!',
        });
      }
      res.status(200).json({
        user,
        token: jwt.sign({ userID: user.id }, process.env.JWT_SECRET, {
          expiresIn: '24h',
        }),
      });
    });
  } catch (error) {
    res.send(error);
  }
};
//update client
exports.update = async (req, res) => {
  //   const clientID = req.params.id;
  //   const {
  //     nom,
  //     prenom,
  //     cin,
  //     mobile,
  //     e_mail,
  //     adresse,
  //     date_naissance,
  //     adresse2,
  //     telephone,
  //     associer,
  //   } = req.body;
  //   let fieldsToChange = ['status'];
  //   for (const [key, value] of Object.entries(req.body)) {
  //     if (value !== null) fieldsToChange.push(key);
  //   }
  //   try {
  //     await Client.update(
  //       {
  //         nom: nom,
  //         prenom: prenom,
  //         cin: cin,
  //         mobile: mobile,
  //         e_mail: e_mail,
  //         adresse: adresse,
  //         date_naissance: date_naissance,
  //         adresse2: adresse2,
  //         telephone: telephone,
  //         associer: associer,
  //         status: 'current',
  //       },
  //       {
  //         where: {
  //           idco_client: clientID,
  //         },
  //         fields: fieldsToChange,
  //       }
  //     );
  //     //no response on postman
  //     res.status(204).json({ succes: true });
  //   } catch (error) {
  //     res.send(error);
  //   }
};
//delete client
exports.deleteUpdate = async (req, res) => {
  const userID = req.params.id;
  try {
    await Utilisateur.update(
      { status: 'deleted' },
      {
        where: {
          id: userID,
        },
      }
    );
    //no response on postman
    res.status(204).json({ succes: true });
  } catch (error) {
    res.send(error);
  }
};

//delete for developement
exports.delete = async (req, res) => {
  const userID = req.params.id;
  try {
    await Utilisateur.destroy({
      where: {
        id: userID,
      },
    });
    res.status(204).send('deleted successfully');
  } catch (error) {
    res.send(error);
  }
};
// exports.get = (req, res) => {};

// exports.add = (req, res) => {};
