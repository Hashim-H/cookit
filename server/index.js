"use strict";
require("dotenv").config();
const app = require("./app");
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
