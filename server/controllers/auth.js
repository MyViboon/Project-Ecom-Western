const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is Required!!!" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is Required!!!" });
    }
    //check Email in DB alrady ?
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "Email already exits!!" });
    }
    //HashPassword
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    //Register to DB fdfd
    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });
    res.send("Register Success");
    // res.send("Hello Register In Controller");
  } catch (error) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    //Step 1 Check Email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user || !user.enable) {
      return res.status(400).json({ message: "User Not found or not Enabled" });
    }
    // Step 2 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Invalid!!!" });
    }
    // Step 3 Create Payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    // Step 4 Generate Token
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Server Error" });
      }
      res.json({ payload, token });
    });
  } catch (error) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    res.send("Hello Current User");
  } catch (error) {
    console.log(err);
    res.status(500).json({ message: "Server ERROR" });
  }
};
