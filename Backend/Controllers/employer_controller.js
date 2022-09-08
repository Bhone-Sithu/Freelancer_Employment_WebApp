const Employer = require('../Models/employer_model');
const register_employer = async (req, res) => {
    const employer = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        country: req.body.country,
        company_name: req.body.company_name,
        company_size: req.body.company_size,
        is_approved: false,
        company_address: req.body.company_address,
        role:"employer",
        currency: 0
    }
    
    // for (let i = 0; i < 100; i++) {
    //     const mock_employer = {
    //         email: `mock_email${i}@gmail.com`,
    //         password: "123",
    //         name: "John",
    //         phone: 09121234568,
    //         country: "Myanmar",
    //         company_name: "Faker",
    //         company_size: 100,
    //         is_approved: false,
    //         company_address: "SanChaung",
    //         currency: 0
    //     }
    //     const registered = await Employer.create(mock_employer);
    // }
    const registered = await Employer.create(employer);
    res.status(201).json({messag:"Employer Account is registered"});
}
const get_employers = async (req, res) => {
    const employers = await Employer.find({is_approved:true});
    res.status(200).json(employers)
}
const get_employer = async (req, res) => {
    const employer = await Employer.findById(req.params.id);
    res.status(200).json(employer)
}
const update_employer = async (req, res) => {
    const employer = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        // phone: 0,
        // country: "String",
        // company_name: "String",
        // company_size: 0,
        // is_approved: false,
        // company_address: "String",
        // currency: 0
    }
    const updated = await Employer.findByIdAndUpdate(req.params.id,employer,{new:true});
    res.status(200).json(updated);
}
const delete_employer = async (req, res) => {
    const deleted = await Employer.findByIdAndDelete(req.params.id);
    // const deleted = await Employer.deleteMany({email:"hi2@gmail.com"})
    res.status(200).json(deleted);
}
module.exports = {
    register_employer,
    get_employers,
    get_employer,
    update_employer,
    delete_employer,
}