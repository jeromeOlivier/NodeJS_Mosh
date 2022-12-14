const { validate, User } = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT
  );
  res
    .header({ "x-auth-token": token })
    .status(200)
    .send({ token: token, name: user.name, email: user.email });
};
