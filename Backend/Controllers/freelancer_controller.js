const Freelancer = require('../Models/freelancer_model');
const register_freelancer = async (req, res) => {
    const freelancer = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: 09123456789,
        country: "Myanmar",
        is_approved: false,
        skillset: ["JavaScript","PHP","HTML","CSS"],
        language: ["English","Myanmar","Japanese"],
        role:"freelancer",
        currency: 0
    }
    
    const registered = await Freelancer.create(freelancer);
    res.status(201).json(registered);
}
const get_freelancers = async (req, res) => {
    const freelancers = await Freelancer.find({});
    res.status(200).json(freelancers)
}
const get_freelancer = async (req, res) => {
    const freelancer = await Freelancer.findById(req.params.id);
    res.status(200).json(freelancer)
}
const update_freelancer = async (req, res) => {
    const freelancer = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        // phone: 09123456789,
        // country: "Myanmar",
        // is_approved: false,
        // skillset: ["JavaScript","PHP","HTML","CSS"],
        // language: ["English","Myanmar","Japanese"],
        // currency: 0
    }
    const updated = await Freelancer.findByIdAndUpdate(req.params.id,freelancer,{new:true});
    res.status(200).json(updated);
}
const delete_freelancer = async (req, res) => {
    const deleted = await Freelancer.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
}
module.exports = {
    register_freelancer,
    get_freelancers,
    get_freelancer,
    update_freelancer,
    delete_freelancer,
}