const User = require("../Models/user");
const Profile = require("../Models/Profile");
const shortid = require("shortid");
const slugify = require("slugify");




exports.create = async (req, res) => {
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
      husband_firstname,
      husband_lastname,
      spouse_firstname,
      spouse_lastname,
      wedding_day,
      incoming_guest,
      way_of_invitation,
      dashboard,
    } = req.body;

    const profile = new Profile({
      husband_firstname,
      husband_lastname,
      spouse_firstname,
      spouse_lastname,
      wedding_day,
      incoming_guest,
      way_of_invitation,
      dashboard,
      slug: slugify(husband_firstname + husband_lastname + spouse_firstname + spouse_lastname + "marriage",
        {
          lower: true,
        }
      ),
    });

    await profile.save();
    res.send({ success: true, profile });

  } catch (error) {

    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getDashboardBySlug = (req, res) => {
  const { slug } = req.params;
  Profile.findOne({ slug }).exec((error, profile) => {
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
  Profile.findOne({ profileId }).exec((error, profile) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (profile) {
      if (profile) res.status(200).json({ profile });
    }
  });
};

exports.getDashboardAllData = (req, res) => {
  Profile.find({}).exec((error, dashboardData) => {
    if (error) return res.status(400).json({ error });

    if (dashboardData) {
      return res.status(200).json({ dashboardData });
    }
  });
};
