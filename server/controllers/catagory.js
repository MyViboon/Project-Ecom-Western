const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    // code
    const { name } = req.body;
    const catagory = await prisma.catagory.create({
      data: {
        name: name,
      },
    });
    res.send(catagory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.read = async (req, res) => {
  try {
    const catagory = await prisma.catagory.findMany();
    res.send(catagory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const catagory = await prisma.catagory.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(catagory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};
