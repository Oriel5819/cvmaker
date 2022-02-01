const Educations = require("../models/educModel");
const asyncHandler = require("express-async-handler");

const educsController = {
  getEducs: asyncHandler(async (req, res) => {
    try {
      const Educs = await Educations.find();
      res.status(200).json(Educs);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  getEduc: asyncHandler(async (req, res) => {
    try {
      const educ = await Educations.findOne({ _id: req.params.id });
      res.status(200).json(educ);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  getEducByUser: asyncHandler(async (req, res) => {
    try {
      const exp = await Educations.find({ userId: req.params.id });
      res.status(200).json(exp);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  createEduc: asyncHandler(async (req, res) => {
    try {
      const educ = await Educations.create(req.body);
      // console.log(req.body);
      res.status(201).json(educ);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  editEduc: asyncHandler(async (req, res) => {
    try {
      const schoolLocation = req.body.address.city;
      const schoolCountry = req.body.address.country;
      const {
        degree,
        schoolName,
        major,
        durationFrom,
        durationTo,
        description,
      } = req.body;

      const updatedEduc = await Educations.findByIdAndUpdate(
        { _id: req.params.id },
        {
          degree,
          schoolName,
          major,
          durationFrom,
          durationTo,
          address: { city: schoolLocation, country: schoolCountry },
          description,
        }
      );

      return res.status(200).json({ updatedEduc });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  removeEduc: asyncHandler(async (req, res) => {
    try {
      await Educations.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ msg: "Educations has deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),
};

module.exports = educsController;
