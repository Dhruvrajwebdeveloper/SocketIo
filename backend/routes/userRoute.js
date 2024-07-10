const { register, login, setAvatar, getAllUsers } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:curruser/:id",getAllUsers);

module.exports = router;