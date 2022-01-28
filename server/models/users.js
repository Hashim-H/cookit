const db = require("./db");

exports.getById = async (id) => {
  try {
    const result = await db.select("*").from("users").where({ id }).first();
    return result;
  } catch (e) {
    return e;
  }
};

exports.getByEmail = async (email) => {
  try {
    const result = await db.from("users").where(email);
    return result;
  } catch (e) {
    return e;
  }
};

exports.add = async (data) => {
  try {
    const result = await db.insert(data).into("users").returning("*");
    return result[0];
  } catch (e) {
    return e;
  }
};
