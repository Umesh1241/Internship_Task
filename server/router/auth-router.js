const express = require("express");
const router = express.Router();
const {
  home,
  register,
  login,
  user,
  createEmployee,
  getEmployeeList,
  updateEmployee,
  deleteEmployee,
  logout,
} = require("../controllers/auth-controller");
const signUpSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const uploadEmployeeImage = require("../middlewares/upload-middleware");
const path = require("path"); 




router.route("/").get(home);
router.route("/register").post(validate(signUpSchema), register);
router.route("/login").post(login);
router.route("/user").get(authMiddleware, user);
router
  .route("/createEmployee")
  .post(uploadEmployeeImage.single("image"), createEmployee);
router.route("/employees").get(getEmployeeList);
router
  .route("/updateEmployee/:id")
  .put(uploadEmployeeImage.single("image"), updateEmployee);
router.route("/deleteEmployee/:id").delete(deleteEmployee);
router.route("/logout").post(logout);
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = router;
