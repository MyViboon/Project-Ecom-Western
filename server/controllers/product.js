const prisma = require("../config/prisma");
const cloudinary = require("cloudinary").v2;

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

//Search Filter Function
const handleQuery = async (req, res, query) => {
  try {
    //code
    const prodeucts = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      include: {
        catagory: true,
        images: true,
      },
    });
    res.send(prodeucts);
  } catch (err) {
    //error
    console.log(err);
    res.status(500).json({ mesage: "Serrch Error" });
  }
};
const handlePrice = async (req, res, priceRange) => {
  try {
    //code
    const prodeucts = await prisma.product.findMany({
      where: {
        price: {
          gte: priceRange[0],
          lte: priceRange[1],
        },
      },
      include: {
        catagory: true,
        images: true,
      },
    });
    res.send(prodeucts);
  } catch (err) {
    //error
    console.log(err);
    res.status(500).json({ mesage: "Server Error" });
  }
};
const handleCategory = async (req, res, categoryId) => {
  try {
    //code
    const prodeucts = await prisma.product.findMany({
      where: {
        catagoryId: {
          in: categoryId.map((id) => Number(id)),
        },
      },
      include: {
        catagory: true,
        images: true,
      },
    });
    res.send(prodeucts);
  } catch (err) {
    //error
    console.log(err);
    res.status(500).json({ mesage: "Server Error" });
  }
};

exports.searchFilters = async (req, res) => {
  try {
    // code
    const { query, catagory, price } = req.body;
    if (query) {
      console.log("query---->", query);
      await handleQuery(req, res, query);
    }
    if (catagory) {
      await handleCategory(req, res, catagory);
      console.log("catagory---->", catagory);
    }
    if (price) {
      await handlePrice(req, res, price);
      console.log("price---->", price);
    }

    // res.send("Hello SearchFilters Product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createImage = async (req, res) => {
  try {
    // console.log(req.body);
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `viboon-${Date.now()}`,
      resource_type: "auto",
      folder: "Ecom2025",
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.removeImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    // console.log(public_id);
    cloudinary.uploader.destroy(public_id, (result) => {
      res.send("Remove Image Success!!!");
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
