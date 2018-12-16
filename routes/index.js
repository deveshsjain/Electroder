const userRoutes = require("./user");
const adminRoutes = require("./admin");

const path = require("path");

const constructorMethod = app => {

  app.use("/admin", adminRoutes);
  app.use("/addlaptop", adminRoutes);
  app.use("/addedlaptop", adminRoutes);
  app.use("/updatelaptop/:id", adminRoutes);
  app.use("/updatedlaptop", adminRoutes);
  app.use("/deletelaptop/:id", adminRoutes);
  
  app.use("/", userRoutes);
  app.use("/user", userRoutes);
  app.use("/user/home", userRoutes);
  app.use("/user/contact", userRoutes);
  app.use("/user/signup", userRoutes);
  app.use("/user/signup/adduser", userRoutes);
  app.use("/user/search", userRoutes);
  app.use("/user/laptops", userRoutes);
  app.use("/user/laptops/laptopdetail", userRoutes);

  app.use("/register", userRoutes);
  app.use("/login", userRoutes);
  app.use("/search", userRoutes);
  app.use("/completeprofile", userRoutes);
  app.use("/profile", userRoutes);

  app.use("/customer", userRoutes);
  app.use("/customer/home", userRoutes);
  app.use("/customer/profile", userRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;