const express = require("express");
const Biography = require("../controller/biography_controller.js");
const Education = require("../controller/education_controller.js");
const Preferences = require("../controller/preferences_controller.js");
const Skills = require("../controller/skills_controller.js");
const Contacts = require("../controller/contacts_controller.js");
const Submissions = require("../controller/submissions_controller.js");
const route = express.Router();

route.get("/biography", Biography);
route.get("/education", Education);
route.get("/preferences", Preferences);
route.get("/skills", Skills);
route.get("/contacts", Contacts);
route.post("/submissions", Submissions);

module.exports = route;