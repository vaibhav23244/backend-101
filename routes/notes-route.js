const express = require("express");

const authenticate = require("../middleware/Authenticate");

const notesController = require("../controllers/notes-controller");

const router = express.Router();

router.use(authenticate);

router.get("/", notesController.getNotes);

router.get("/:id", notesController.getNotesByID);

router.post("/create", notesController.createNotes);

router.put("/:id", notesController.updateNotes);

router.delete("/:id", notesController.deleteNotes);

module.exports = router;
