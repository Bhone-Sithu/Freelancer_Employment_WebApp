const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');

const register_admin = async(req,res) => {
    const admin = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: 09123456789,
        role:"admin",
        currency: 0
    }
    const registered = await Admin.create(admin);
    res.status(201).json(registered);
}

const get_admins = async (req, res) => {
    const admins = await Admin.find({});
    res.status(200).json(admins)
}
const get_admin = async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    res.status(200).json(admin)
}
const get_unapproved = async (req, res) => {
    const unapproved_employer = await Employer.find({ is_approved: false });
    const unapproved_freelancer = await Freelancer.find({ is_approved: false });
    res.status(200).json({unapproved_employer,unapproved_freelancer })
}
const approve = async (req, res) => {
    const unapproved = await Employer.findById(req.params.id);
    let approved;
    if (unapproved) {
        approved = await Employer.findByIdAndUpdate(req.params.id, { is_approved: true }, { new: true });
    } else {
        approved = await Freelancer.findByIdAndUpdate(req.params.id, { is_approved: true }, { new: true });
    }
    res.status(200).json(approved);


}
module.exports = {
    approve,
    get_admins,
    get_admin,
    get_unapproved,
    register_admin
}