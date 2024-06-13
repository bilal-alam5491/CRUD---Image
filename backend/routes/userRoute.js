const express = require("express");
const userModel = require("../models/userModel.js");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { FileIcon } = require("lucide-react");

const router = express.Router();

// Construct the path to the 'uploads' directory
const fileDir = path.join(__dirname, "..", "/uploads");
// Ensure the 'uploads' directory exists
if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir);
}

console.log(fileDir)


router.use('/uploads/',  express.static(fileDir));




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).single("imgKey");

// getAll
router.get("/get/", async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    res.status(201).json({
      count: allUsers.length,
      users: allUsers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// getbyID
router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userByID = await userModel.findById(id);
    res.status(201).json({ user: userByID });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// add
router.post("/add", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ error: "An error occurred while uploading the file." });
    } else {
      try {
        if (
          !req.body.name ||
          !req.body.email ||
          !req.body.password ||
          !req.file.filename
        ) {
          res.status(400).send({ message: "Send All Fields Please" });
        }

        // make a object to send data to db
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          image: req.file.filename,
        };

        // Save the newData document to the database using UserModel.create()
        const savedData = await userModel.create(newUser);
        res.json({
          message: "Data uploaded successfully.",
          data: savedData,
        });
      } catch (err) {
        console.error("Error saving data to database:", err);
        return res.status(500).json({
          error: "An error occurred while saving the image to the database.",
        });
      }
    }
  });
});

// update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    upload(req, res, async (err) => {
      if (err) {
        console.error(err.message);
        return res
          .status(500)
          .json({ error: "An error occurred while uploading the file." });
      } else {
        try {
         

          // make a object to send data to db
          const updatedUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.file.filename,
          };

          // Save the newData document to the database using UserModel.create()
          const updatedData = await userModel.findByIdAndUpdate(
            id,
            updatedUser,
            { new: true }
          );
          res.json({
            message: "Data updated successfully.",
            data: updatedData,
          });
        } catch (err) {
          console.error("Error saving data to database:", err);
          return res.status(500).json({
            error: "An error occurred while saving the image to the database.",
          });
        }
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete(id);

    res.status(201).json({
      message: "Deleted Successfully",
      deletedUser: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
