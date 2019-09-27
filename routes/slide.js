const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// const auth = require("../middleware/auth");

const Slide = require("../models/Slide");

router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log(req.body);
    const newSlide = new Slide({
      text: req.body.text
    });

    const slide = await newSlide.save();

    res.json(slide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get("/:id", async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ msg: "Slide not found" });
    }
    res.json(slide);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Slide not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);

    await slide.save();
    res.json(slide);
    return res.status(400).json({ msg: "Slide updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
