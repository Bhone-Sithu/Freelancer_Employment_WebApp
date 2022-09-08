const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');
const Project = require('../Models/project_model');

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
const get_unapproved_employers = async (req, res) => {
    const unapproved_employer = await Employer.find({ is_approved: false });
    const unapproved_freelancer = await Freelancer.find({ is_approved: false });
    res.status(200).json([...unapproved_employer])
}
const get_unapproved_freelancers = async (req, res) => {
    const unapproved_freelancer = await Freelancer.find({ is_approved: false });
    res.status(200).json([...unapproved_freelancer])
}
const get_unapproved_projects = async (req, res) => {
   
    const unapproved_project = await Project.find({ is_approved: false });
    res.status(200).json(unapproved_project)
}
const approve_account = async (req, res) => {
    const unapproved = await Employer.findById(req.params.id);
    let approved;
    if (unapproved) {
        approved = await Employer.findByIdAndUpdate(req.params.id, { is_approved: true }, { new: true });
    } else {
        approved = await Freelancer.findByIdAndUpdate(req.params.id, { is_approved: true }, { new: true });
    }
    res.status(200).json(approved);
}
const approve_project = async (req, res) => {
    let approved = await Project.findByIdAndUpdate(req.params.id, { is_approved: true, }, { new: true });
    res.status(200).json(approved);
}
module.exports = {
    approve_account,
    approve_project,
    get_admins,
    get_admin,
    get_unapproved_employers,
    get_unapproved_projects,
    get_unapproved_freelancers,
    register_admin
}