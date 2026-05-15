const authService = require("../services/auth.service");
const { getUserByEmail, createUser } = require("../services/user.service");
const { logActivity } = require("../services/activity.service");

// POST (register)
const authController = {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        return res.status(400).json({ error: "Invalid email format" });
      }

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: "Email already in use" });
      }

      const passwordHash = await authService.hashPassword(password);

      const newUser = await createUser(name, email, passwordHash, 'user'); 
      
      // log the activity
      await logActivity(
        newUser.id,
        "USER_REGISTERED",
        { email: newUser.email },
        req.ip
      );

      return res
        .status(201)
        .json({ message: "User registered successfully", userId: newUser.id, user: newUser });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ error: "Server error during registration" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const user = await getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isMatch = await authService.comparePasswords(
        password,
        user.password,
      );
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = await authService.generateToken(user);

      // log the login activity
      await logActivity(
        user.id,
        "USER_LOGIN",
        { email: user.email },
        req.ip
      );

      return res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ error: "Server error during registration" });
    }
  },
};

module.exports = authController;