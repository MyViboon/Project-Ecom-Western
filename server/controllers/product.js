exports.create = async (req, res) => {
  try {
    // code

    res.send("Hello Product");
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
