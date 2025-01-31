const prisma = require("../config/prisma");

exports.listUsers = async (req, res) => {
  try {
    //code
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        enable: true,
        address: true,
      },
    });
    // res.send("Hello Users");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.changesStatus = async (req, res) => {
  try {
    //code
    const { id, enable } = req.body;
    console.log(id, enable);
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { enable: enable },
    });
    res.send("Update Status Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.changesRole = async (req, res) => {
  try {
    //code
    const { id, role } = req.body;
    console.log(id, role);
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { role: role },
    });
    res.send("Update Role Success");
    // res.send("Hello ChangesRole");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.userCart = async (req, res) => {
  try {
    //code
    const { cart } = req.body;
    console.log(cart);
    console.log(req.user.id);

    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
    });
    // console.log(user);

    //Delete Old Cart Item
    await prisma.producetOnCart.deleteMany({
      where: {
        cart: { orderedById: user.id },
      },
    });

    //Delete Old Cart
    await prisma.cart.deleteMany({
      where: { orderedById: user.id },
    });

    //เตรียมสินค้า
    let products = cart.map((item) => ({
      productId: item.id,
      count: item.count,
      price: item.price,
    }));

    //หาผลรวม
    let cartTotal = products.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    // New Cart
    const newCart = await prisma.cart.create({
      data: {
        products: {
          create: products,
        },
        cartTotal: cartTotal,
        orderedById: user.id,
      },
    });

    console.log(newCart);

    res.send("Add Cart OK.");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    //code
    res.send("Hello GetUserCart");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    //code
    res.send("Hello EmptyCart");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.saveAddress = async (req, res) => {
  try {
    //code
    res.send("Hello SaveAddress");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.saveOrder = async (req, res) => {
  try {
    //code
    res.send("Hello SaveOrder");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getOrder = async (req, res) => {
  try {
    //code
    res.send("Hello GetOrder");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
