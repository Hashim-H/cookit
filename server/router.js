"use strict";

const router = require("express").Router();
const userController = require("./controllers/users");
const recipeController = require("./controllers/recipes");
const authMiddleware = require("./middlewares/auth");
const multerMiddleware = require("./middlewares/multer");

//AUTH

router.post("/api/auth/signup", userController.create);
router.post("/api/auth/login", userController.login);

//RECIPES

router.get("/api/recipes", recipeController.list);
router.get("/api/recipes/:id", recipeController.getById);
router.post("/api/recipes/create", authMiddleware, recipeController.create);


module.exports = router;
