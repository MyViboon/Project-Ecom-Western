exports.create = async (req, res) => {
  try {
    res.send("Hello Catagory");
  } catch (error) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.read = async (req, res) => {
  try {
    res.send("Hello Catagory List");
  } catch (error) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.send("Hello Catagory Remove");
  } catch (error) {
    console.log(err);
    res.status(500).json({ mesage: "Server ERROR" });
  }
};
