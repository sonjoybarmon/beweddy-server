const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require('./user')

const questionSchema = new mongoose.Schema(
  {
    your_firstname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    your_lastname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20,
    },
    spouse_firstname: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 20,
    },
    spouse_lastname: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 20,
    },
    wedding_day: {
      type: Object,
      required: true,
    },
    way_of_invitation: {
      type: String,
      required: true,
      enum: {
        values: ["text", "email", "mail_out"],
        message:
          "Please provide text invitation or emil invitation or mail out invitation",
      },
    },
    incoming_guest: {
      type: Number,
      required: true,
    },
    dashboard: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Question", questionSchema);
