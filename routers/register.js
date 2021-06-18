const routers = require("express").Router();
const registerController = require("../controllers/registerController");
const { body, validationResult } = require("express-validator");

routers.get("/", registerController.getRegisterForm);
routers.post(
  "/",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("role_id").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
  },
  registerController.register
);

module.exports = routers;
