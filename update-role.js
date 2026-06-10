require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const updateRole = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await User.updateOne(
      { email: "garypesquisa@gmail.com" },
      { role: "admin" }
    );
    console.log('Usuario actualizado:', result);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateRole();