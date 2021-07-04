const { check, validationResult } = require("express-validator");


  //husband_firstname
  //husband_lastname/
  //spouse_firstname
  //spouse_lastname
  //wedding_day
  //incoming_guest
  //way_of_invitation
  //dashboard

exports.checkProfile = [

    check("husband_firstname", "Please add your firstname").notEmpty().trim().bail().isLength({ min: 3, max: 20 }).withMessage("Your name must be between 2 to 20 chars"),
    check("files", "Please add your post image").notEmpty(),
    check("description", "Please add your post description").notEmpty(),
    check("tags", "Please add your post tags").notEmpty(),
    check("isMature", "Please add post is mature or not").notEmpty(),
    check("isSensitive", "Please add post is sensitive or not").notEmpty(),
   
]


exports.profileValidationResult = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return res.status(400).send({ success: false, errors: errors.array()[0].msg });
    }
    next();
}
