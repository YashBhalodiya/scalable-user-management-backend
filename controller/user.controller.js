const redis = require("../redis/redis");
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const user = await createUser(name, email, null, "user"); // password is null and role is 'user'

    return res
      .status(201)
      .json({ Status: "Success", Message: "User Created", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

// GET /users/:id
const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const key = `user:${id}`;

    // First get user from redis
    const cachedUser = await redis.get(key);

    // if found -> return
    if (cachedUser) {
      console.log("Cache Hit");
      return res.json(JSON.parse(cachedUser));
    }

    console.log("Cache Miss");

    const user = await getUserById(id);

    if (!user) {
      return res
        .status(404)
        .json({ Status: "Failed", Message: "User not found." });
    }

    // if not found -> first set in redis then return
    await redis.set(key, JSON.stringify(user), "EX", 60);

    return res.json({ status: "Success", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to GET an user" });
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
    // invalidate redis cache after update
    const key = `user:${id}`;
    await redis.del(key);

    return res.json({ status: "Success", data: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to UPDATE an user" });
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

    // invalidate redis cache after update
    const key = `user:${id}`;
    await redis.del(key);

    return res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to DELETE an user" });
  }
};

module.exports = {
  createUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
};
