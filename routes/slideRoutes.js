const express = require("express");
const router = express.Router();
const Slide = require("../models/Slide");

router.post("/api/slide", async (req, res) => {
  const slideData = req.body.text;
  console.log(slideData);
  try {
    const newSlide = await Slide.create({ text: slideData });
    // console.log(newSlide);
    res.status(201).json(newSlide.toJSON(newSlide));
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.get("/api/slides", async (req, res) => {
  try {
    const slides = await Slide.find().lean();
    res.json(slides);
  } catch (e) {
    console.error(e);
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
// router.get("/:id", async (req, res) => {
//   try {
//     const slide = await Slide.findById(req.params.id);
//     if (!slide) {
//       return res.status(404).json({ msg: "Slide not found" });
//     }
//     res.json(slide);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Slide not found" });
//     }
//     res.status(500).send("Server Error");
//   }
// });

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put("/api/slide/:id", async (req, res) => {
  const slideToUpdate = req.params.id;
  const updatedSlideInfo = req.body.val;

  try {
    const updateSlide = await Slide.findByIdAndUpdate(
      slideToUpdate,
      { text: updatedSlideInfo },
      { new: true }
    );
    res.status(200).json(updateSlide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
