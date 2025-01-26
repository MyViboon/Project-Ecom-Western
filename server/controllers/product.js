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
exports.read = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    const prodeucts = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        catagory: true,
        images: true,
      },
    });
    res.send(prodeucts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.list = async (req, res) => {
  try {
    // code
    const { count } = req.params;
    const prodeucts = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: "desc" },
      include: {
        catagory: true,
        images: true,
      },
    });
    res.send(prodeucts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.update = async (req, res) => {
  try {
    // code
    const { title, description, price, quantity, catagoryId, images } =
      req.body;
    // console.log(title, description, price, quantity, images)

    await prisma.image.deleteMany({
      where: {
        productId: Number(req.params.id),
      },
    });

    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
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
            secure_url: item.secure_url,
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

exports.remove = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.send("Delete Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.listby = async (req, res) => {
  try {
    // code
    const { sort, order, limit } = req.body;
    // console.log(sort, order, limit);
    const prodeucts = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: { catagory: true },
    });

    res.send(prodeucts);
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
