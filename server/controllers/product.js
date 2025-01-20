const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    // code
    const { title, description, price, quantity, catagoryId, images } =
      req.body;
    // console.log(title, description, price, quantity, images);
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        catagoryId: parseInt(catagoryId),
        images: {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_id: item.secure_id,
          })),
        },
      },
    });

    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.list = async (req, res) => {
  try {
    // code

    res.send("Hello List Product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.update = async (req, res) => {
  try {
    // code

    res.send("Hello Update Product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.remove = async (req, res) => {
  try {
    // code

    res.send("Hello Delete Product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.listby = async (req, res) => {
  try {
    // code

    res.send("Hello Listby Product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.searchFilters = async (req, res) => {
  try {
    // code

    res.send("Hello SearchFilters Product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};
