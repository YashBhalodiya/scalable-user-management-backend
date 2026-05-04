const {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../services/user.service");

// POST /users
const createUserController = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const user = await createUser(name, email);

    res.status(201).json({ Status: "Success", Message: "User Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

// GET /users/:id
const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ Status: "Failed", Message: "User not found." });
    }

    return res.json({ status: "Success", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

// PUT /users/:id
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const updatedUser = await updateUser(id, name);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found." });
    }

    return res.json({ status: "Success", data: updateUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

// DELETE /users/:id
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found." });
    }

    return res
      .status(200)
      .json({
        status: "Success",
        message: "User deleted successfully",
        data: deletedUser,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
