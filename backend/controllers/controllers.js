import User from "../models/user.js";
import bcrypt from "bcrypt";

// Register Controller
export const userRegister = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      userName,
      password: hashedPassword,
      avatar: `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${userName}`,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Controller
export const userLogin = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// controller/statsController.js
export const getStats = async (req, res) => {
  const { userName } = req.params;

  if (!userName) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.scores.slice(-10)); // limit to last 10 if needed
  } catch (error) {
    console.error("Get Stats Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// controller/statsController.js
export const addStat = async (req, res) => {
  const { userName } = req.params;
  const { wpm } = req.body;

  if (!userName || typeof wpm !== "number") {
    return res.status(400).json({ message: "Username and WPM are required" });
  }

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newScores = [...user.scores, wpm];
    const newTotalTests = user.totalTests + 1;
    const newAverageScore =
      (user.averageScore * user.totalTests + wpm) / newTotalTests;

    const updatedUser = await User.findOneAndUpdate(
      { userName },
      {
        scores: newScores,
        averageScore: newAverageScore,
        totalTests: newTotalTests,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Score added", scores: updatedUser.scores });
  } catch (error) {
    console.error("Add Stat Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const allStats = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { userName } = req.params;

  if (!userName) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await User.findOneAndDelete({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
