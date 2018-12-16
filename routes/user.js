const express = require("express");
const router = express.Router();
const data = require("../data");
var passwordHash = require('password-hash');
const prodData = data.productsData;
const userData = data.userData;
const url = require("url");
var dialog = require('dialog');

//-------------------- User Routes Start -------------------//

router.get("/", function (req, res) {
  if (req.cookies.AuthCookie) {
    if (isUserVerifyByCookie(req.cookies.AuthCookie)) {
      res.redirect("/customer/home");
    } else {
      res.render("user/home", {});
    }
  } else {
    res.render("user/home", {});
  }
});
router.get("/user", (req, res) => {

   if (req.cookies.AuthCookie) {
    if (isUserVerifyByCookie(req.cookies.AuthCookie)) {
      res.redirect("/customer/home");
    } else {
      res.render("user/home", {});
    }
  } else {
    res.render("user/home", {});
  }
});
router.get("/contact", (req, res) => {
  res.render("user/contact", {});
});
router.get("/register", (req, res) => {
  res.render("user/register", {});
});
router.get("/signup", (req, res) => {
  res.render("user/signup", {});
});
router.get("/laptops", async (req, res) => {
  try {
    const prodList = await prodData.getAllProducts()
    console.log(prodList)
    res.render('user/laptops', { prodList });
  } catch (e) {
    console.log(e)
    res.status(500).send();
  }
});
router.get("/laptops/laptopdetail/:id", async (req, res) => {
  try {
    const prod = await prodData.getProduct(req.params.id)
    console.log(prod)
    res.render('user/laptopdetail', { prod });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

//------------------- User Routes End -----------------------//


// ------------------  User Login / SignUp Start  ------------------//

let getUsernameFromCookie = cookieValue => {
  let userlogin = JSON.stringify(cookieValue).split("/");
  usernametemp = userlogin[0].split('"');
  username = usernametemp[1];
  return username;
};

let isUserVerifyByCookie = cookieValue => {
  let userlogin = JSON.stringify(cookieValue).split("/");
  usernametemp = userlogin[0].split('"');
  username = usernametemp[1];
  passwordtemp = userlogin[1].split('"');
  password = passwordtemp[0];
  let isVerify = userData.isValidUser(username, password);
  return isVerify;
};


router.post("/user/login", function (req, res) {
  console.log('From Login: ' + req.body);
  username = req.body.username;
  password = req.body.password;
  var hashedPassword = passwordHash.generate(password);
  console.log('From Login: ' + hashedPassword);

  if (userData.isValidUser(username, password)) {
    res.cookie("AuthCookie", username + "/" + hashedPassword, {
      maxAge: 100 * 3600 * 1000
    });
      
    res.render("user/home", {});
  } else {
    dialog.info('Invalid Username or Password!');
   
    res.render("user/home", {});
  }
});

router.post("/user/adduser", async (req, res) => {
  try {
    console.log(req.body);
    const password = req.body.password;
    const hashedPassword = passwordHash.generate(password);
    const userDetails = req.body;
    const username = userDetails.username;
    const fullusername = userDetails.fullusername;
    const email = userDetails.email;
    const contact_number = userDetails.contact_number;
    const address = userDetails.address;
    var user = userData.createUserByParams(username, hashedPassword, userDetails.fullname, email, contact_number, address);
    console.log(user);
    dialog.info('Successfully Registered! Please Login');
    res.render("user/home");
  }
  catch (e) {
    console.log(e)
    res.status(500).send();
  }
});

// ------------------  User Login / SignUp End ------------------//


//-------------- Customer Routes Start --------------//

router.get("/customer/home", function (req, res) {
  if (req.cookies.AuthCookie !== undefined) {
    let cookieValue = req.cookies.AuthCookie;
    if (isUserVerifyByCookie(cookieValue)) {
      let customer = userData.getUserByUsername(
        getUsernameFromCookie(cookieValue)
      );

      res.render("user/home", { });
    } else {
      res.render("user/home", { });
    }
  } else {
    res.render("user/home", {  });
  }
});

router.get("/customer/logout", function (req, res) {
  try {
    res.clearCookie("AuthCookie");
    dialog.info('Logged Out!');
    res.render("user/home");
  } catch (e) {
    console.log(e);
  }
});


//-------------- Customer Routes End --------------//


module.exports = router;

