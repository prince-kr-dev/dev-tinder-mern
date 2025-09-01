// Signup
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      about,
      skills,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      throw new Error("Email Already Exist");
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      about,
      skills,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    // ✅ set cookie securely
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 8 * 3600000, // 8 hours
    });

    res.status(200).json({ message: "User added successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid Credentials");
    }

    const token = await user.getJWT();

    // ✅ set cookie securely
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 8 * 3600000,
    });

    res.status(200).json({ user });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

// Logout
authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.send("User Logged out successfully");
});
