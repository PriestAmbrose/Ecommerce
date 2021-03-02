import express from "express";
import expressAsyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";
import data from "../data.js";
import { generateToken, isAuth } from "../utils.js";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.removed({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

//first create sign in router
//post http aware is used because when you are returning singin data,
//a token is generated to authenticate user for next request and when you
//are creating a new resource you need to set your http aware as a post request
//because you cannot run this request through the browser, address bar
//then type it and press enter. You need to use postman to test it.
userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    //An ajax request is sent  to check the user and email in the database
    const user = await User.findOne({ email: req.body.email });
    //you need to check if user exist and compare it with the password
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //if the comparison is true then i would send only parts of user data
        res.send({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          //the token would be generated by json webtoken to be used to authenticate and authorise user.
          token: generateToken(user),
        });
        return;
      }
    }
    // if user does not exist or password does not match a status 401 would be sent.
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const createdUser = await user.save();
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      //the token would be generated by json webtoken to be used to authenticate and authorise user.
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.send(404).send({ message: "User not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

export default userRouter;
