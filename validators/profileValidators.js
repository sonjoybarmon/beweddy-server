const { check, validationResult } = require("express-validator");



exports.checkProfile = [

    check("husband_firstname", "Please add your firstname").notEmpty().trim().bail().isLength({ min: 3, max: 20 }).withMessage("Your firstname name must be between 3 to 20 chars"),
    check("husband_lastname", "Please add your lastname").notEmpty().trim().bail().isLength({ min: 3, max: 20 }).withMessage("Your lastname name must be between 3 to 20 chars"),
    check("spouse_firstname", "Please add your Spouse firstname").notEmpty().trim().bail().isLength({ min: 3, max: 20 }).withMessage("Spouse firstname name must be between 3 to 20 chars"),
    check("spouse_lastname", "Please add your Spouse lastname").notEmpty().trim().bail().isLength({ min: 3, max: 20 }).withMessage("Spouse lastname name must be between 3 to 20 chars"),
    check("wedding_day", "Please add your weeding day").notEmpty(),
    check("incoming_guest", "Please add your no. of guest").notEmpty(),
    check("way_of_invitation").notEmpty().withMessage("Please add your invitation way").trim().isLength({ min: 1 }),
]


exports.profileValidationResult = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){

        return res.status(400).send({ success: false, errors: errors.array()[0].msg });
    }
    next();
}
