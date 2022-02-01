const Experiences = require("../models/expModel");
const asyncHandler = require("express-async-handler");

const expsController = {
  getExps: asyncHandler(async (req, res) => {
    try {
      const Exps = await Experiences.find();
      res.status(200).json(Exps);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  getExp: asyncHandler(async (req, res) => {
    try {
      const exp = await Experiences.findOne({ _id: req.params.id });
      res.status(200).json(exp);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  getExpByUser: asyncHandler(async (req, res) => {
    try {
      const exp = await Experiences.find({ userId: req.params.id });
      res.status(200).json(exp);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  createExp: asyncHandler(async (req, res) => {
    try {
      const exp = await Experiences.create(req.body);
      res.status(201).json(exp);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),

  editExp: asyncHandler(async (req, res) => {
    try {
      const companyLocation = req.body.address.city;
      const companyCountry = req.body.address.country;
      const {
        jobPosition,
        companyName,
        contractTitle,
        durationFrom,
        durationTo,
        description,
      } = req.body;

      const updatedExp = await Experiences.findByIdAndUpdate(
        { _id: req.params.id },
        {
          jobPosition,
          companyName,
          contractTitle,
          durationFrom,
          durationTo,
          address: { city: companyLocation, country: companyCountry },
          description,
        }
      );

      return res.status(200).json({ updatedExp });

      // console.log("ID >>>>>>>> ", req.params.id);
      // console.log("RESPONDS >>>>>>>> ", updatedExp);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
      // return console.log("ERROR >>>>>>>> ", err.message);
    }
  }),

  removeExp: asyncHandler(async (req, res) => {
    try {
      await Experiences.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ msg: "Experiences has deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }),
};

module.exports = expsController;
