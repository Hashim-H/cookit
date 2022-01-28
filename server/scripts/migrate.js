require("dotenv").config();
const db = require("../models/db");
const cuisines = [
  "Mexican",
  "Italian",
  "Indian",
  "French",
  "Greek",
  "American",
  "Spanish",
].sort();
(async () => {
  try {
    await db.schema.dropTableIfExists("replys");
    await db.schema.dropTableIfExists("comments");
    await db.schema.dropTableIfExists("tag_recipes");
    await db.schema.dropTableIfExists("tags");
    await db.schema.dropTableIfExists("likes");
    await db.schema.dropTableIfExists("photos");
    await db.schema.dropTableIfExists("recipes");
    await db.schema.dropTableIfExists("cuisines");
    await db.schema.dropTableIfExists("users");
    await db.schema.withSchema("public").createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("username");
      table.string("email");
      table.string("password");
      table.timestamps(true, true);
    });
    console.log("Created users table!");
    await db.schema.withSchema("public").createTable("cuisines", (table) => {
      table.increments("id").primary();
      table.string("cuisine");
      table.timestamps(true, true);
      console.log("Created cuisines table!");
    });
    for (let cuisine of cuisines) {
      await db.insert({ cuisine }).into("cuisines");
    }
    await db.schema.withSchema("public").createTable("recipes", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("cuisine_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cuisines");
      table.string("title");
      table.text("description");
      table.text("ingredients");
      table.text("steps");
      table.integer("likes");
      table.timestamps(true, true);
      table.index(["title"], "idx_recipe_title");
      table.index(["user_id"], "idx_recipe_user");
      console.log("Created recipes table!");
    });
    await db.schema.withSchema("public").createTable("comments", (table) => {
      table.increments("id").primary();
      table
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE");
      table.text("comment");
      table.timestamps(true, true);
      table.index(["recipe_id"], "idx_comments_recipe");
      console.log("Created comments table!");
    });
    await db.schema.withSchema("public").createTable("replys", (table) => {
      table.increments("id").primary();
      table
        .integer("comment_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("comments")
        .onDelete("CASCADE");
      table.text("reply");
      table.timestamps(true, true);
      table.index(["comment_id"], "idx_replys_comment");
      console.log("Created replys table!");
    });
    await db.schema.withSchema("public").createTable("likes", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE");
      table
        .boolean("is_like")
        .comment("true=like, false=disLike")
        .notNullable();
      table.timestamps(true, true);
      table.index(["recipe_id"], "idx_likes_recipe");
      table.index(["user_id"], "idx_likes_user");
      console.log("Created likes table!");
    });
    await db.schema.withSchema("public").createTable("photos", (table) => {
      table.increments("id").primary();
      table
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE");
      table.string("path").notNullable();
      table.timestamps(true, true);
      table.index(["recipe_id"], "idx_photos_recipe");
      console.log("Created photos table!");
    });
    await db.schema.withSchema("public").createTable("tags", (table) => {
      table.increments("id").primary();
      table.string("tag");
      table.timestamps(true, true);
      console.log("Created tags table!");
    });
    await db.schema.withSchema("public").createTable("tag_recipes", (table) => {
      table.increments("id").primary();
      table
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE");
      table
        .integer("tag_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tags")
        .onDelete("CASCADE");
      table.timestamps(true, true);
      console.log("Created tag_recipes table!");
    });

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
