const User = require("../Models/user");
const Question = require("../Models/Question");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createWeddyProfile = async (req, res) => {
  console.log(req.body, "body");

  //husband_firstname
  //husband_lastname/
  //spouse_firstname
  //spouse_lastname
  //wedding_day
  //incoming_guest
  //way_of_invitation
  //dashboard

  try {
    const {
      your_firstname,
      your_lastname,
      spouse_firstname,
      spouse_lastname,
      wedding_day,
      incoming_guest,
      way_of_invitation,
      dashboard,
    } = req.body;

    const question = new Question({
      your_firstname,
      your_lastname,
      spouse_firstname,
      spouse_lastname,
      wedding_day,
      incoming_guest,
      way_of_invitation,
      dashboard,
      slug: slugify(
        your_firstname +
          your_lastname +
          spouse_firstname +
          spouse_lastname +
          "marriage",
        {
          lower: true,
        }
      ),
    });

    await question.save();
    res.send({ success: true, wedding_profile: question });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getDashboardBySlug = (req, res) => {
  const { slug } = req.params;
  Question.findOne({ slug }).exec((error, profile) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (profile) {
      if (profile) res.status(200).json({ profile });
    }
  });
};

exports.getDashboardDetailsById = (req, res) => {
  const { profileId } = req.params;
  Question.findOne({ profileId }).exec((error, profile) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (profile) {
      if (profile) res.status(200).json({ profile });
    }
  });
};

exports.getDashboardAllData = (req, res) => {
  Question.find({}).exec((error, dashboardData) => {
    if (error) return res.status(400).json({ error });

    if (dashboardData) {
      return res.status(200).json({ dashboardData });
    }
  });
};
