const Notes = require("../models/notes");

const getNotes = async (req, res, next) => {
  const user_id = req.user._id;
  let note;
  try {
    note = await Notes.find({ user_id }).sort({ createdAt: -1 });
    if (note.length === 0) {
      return res.json({ message: "No notes found.", status: false });
    }
  } catch (err) {
    return res.json({
      message: "Error while fetching the notes.",
      status: false,
    });
  }
  return res.status(200).json({ note, status: true });
};

const getNotesByID = async (req, res, next) => {
  const { id } = req.params;
  let note;
  try {
    note = await Notes.findById(id);
    if (!note) {
      return res.json({ message: "No notes found.", status: false });
    }
  } catch (err) {
    return res.json({
      message: "Error while fetching the notes.",
      status: false,
    });
  }
  return res.status(200).json({ note, status: true });
};

const createNotes = async (req, res, next) => {
  const user_id = req.user._id;
  const { title, description, tags } = req.body;
  const newNote = new Notes({
    title,
    description,
    tags,
    user_id,
  });
  try {
    await newNote.save();
  } catch (err) {
    return res.json({
      message: "An error occured while creating a new note.",
      status: false,
    });
  }
  return res.status(200).json({ newNote, status: true });
};

const updateNotes = async (req, res, next) => {
  const { id } = req.params;
  let note;
  try {
    note = await Notes.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!note) {
      return res.json({ message: "No notes found.", status: false });
    }
  } catch (err) {
    return res.json({
      message: "Error while fetching the notes.",
      status: false,
    });
  }
  return res.json({ note, status: true });
};

const deleteNotes = async (req, res, next) => {
  const { id } = req.params;
  let note;
  try {
    note = await Notes.findOneAndDelete({ _id: id });
    if (!note) {
      return res.json({ message: "No notes found.", status: false });
    }
  } catch (err) {
    return res.json({
      message: "Error while fetching the notes.",
      status: false,
    });
  }
  return res.status(200).json({ status: true });
};

module.exports.getNotes = getNotes;
module.exports.getNotesByID = getNotesByID;
module.exports.createNotes = createNotes;
module.exports.updateNotes = updateNotes;
module.exports.deleteNotes = deleteNotes;
