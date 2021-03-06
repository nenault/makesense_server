var express = require("express");
var router = express.Router();
const Volunteer = require("../models/Volunteer");

router.get("/", async (req, res, next) => {
  try {
    const apiRes = await Volunteer.find();
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await Volunteer.findById(req.params.id);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res, next) => {
  // try {
  //   const newVolunteer = req.body;
  //   const apiRes = await Volunteer.create(newVolunteer);
  //   res.status(201).json(apiRes);
  // } catch (err) {
  //   res.status(500).json(err);
  // }

  const { prenom, nom, email } = req.body;

  Volunteer.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      const newUser = { email, prenom, nom };

      Volunteer.create(newUser)
        .then((newUserDocument) => {
          res.status(200).json(newUserDocument);
        })
        .catch(next);
    })
    .catch(next);
});

router.patch("/:id", async (req, res, next) => {
  try {
    const updatedVolunteer = req.body;
    const apiRes = await Volunteer.findByIdAndUpdate(req.params.id, updatedVolunteer, {
      new: true,
    });
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const apiRes = await Volunteer.findByIdAndDelete(req.params.id);
    res.status(204).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
