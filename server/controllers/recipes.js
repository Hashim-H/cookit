const Recipe = require("../models/recipes");

exports.create = async (req, res) => {

  const { title, description, ingredients, steps, cuisine_id } = req.body;
  const user_id = req.user.id;


  try {
    const result = await Recipe.add({
      user_id,
      cuisine_id,
      title,
      description,
      ingredients,
      steps,
    });

    res.status(201);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "Could not create recipe" });

  }
};

exports.list = async (req, res) => {
  try {
    const result = await Recipe.list();
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: "Could not list recipes" });
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Recipe.getById(id);
    if (!result) {
      res.status(409).send({ error: "404", message: "Recipe not found" });
    }
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: "Could not get recipe" });
  }
};
