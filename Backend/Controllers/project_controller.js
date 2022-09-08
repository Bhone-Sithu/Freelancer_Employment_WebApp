const Project = require('../Models/project_model');
const post_project = async (req, res) => {
    // const project = {
    //     employer_id: "62ecacb4ad55966fa4f37af5",
    //     freelancer_id: "",
    //     title: req.body.title,
    //     description: req.body.description,
    //     skillset: req.body.skillset,
    //     language:req.body.language,
    //     candidate: [],
    //     payment: req.body.payment,
    //     expire_date: 15,
    //     deadline: req.body.deadline,
    //     dashboard_id: "",
    //     is_approved:false
    // }
    for (let index = 1; index <= 50; index++) {
        const project = {
            employer_id: "62ecacb4ad55966fa4f37af5",
            freelancer_id: "",
            title: `Project ${index}`,
            description: `Project ${index} Project ${index} Project ${index} Project ${index} Project ${index} Project ${index} Project ${index} Project ${index} Project ${index}`,
            skillset: ["Business", "PHP", "JavaScript"],
            language: ["Japanese", "English", "Burmese"],
            candidate: ["62e29f63ecd208dbea756d7c", "62edda9f96515e298eefa266", "6310cfe76f3f8b7ad5a73997", "6310cf4604c2b6a750b70701", "6310d1a76f3f8b7ad5a744e1"],
            payment: 400,
            expire_date: 15,
            deadline: "2023-09-24T17:30:00.000Z",
            dashboard_id: "",
            is_approved: false
        }
        const posted = await Project.create(project);
    }
    
    res.status(201).json({ messag: "Your project post has been requested" });
}
const get_projects = async (req, res) => {
    const projects = await Project.find({});
    res.status(200).json(projects)

}

const get_project = async (req, res) => {
    const project = await Project.findById(req.params.id);
    project.skillset = project.skillset.join(" , ")
    project.language = project.language.join(" , ")
    res.status(200).json(project)
}
const update_project = async (req, res) => {
    const project = {
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
    const updated = await project.findByIdAndUpdate(req.params.id, project, { new: true });
    res.status(200).json(updated);
}
const delete_project = async (req, res) => {
    const deleted = await project.findByIdAndDelete(req.params.id);
    // const deleted = await project.deleteMany({email:"hi2@gmail.com"})
    res.status(200).json(deleted);
}
const apply_project = async (req, res) => {
    const project = await Project.findById(req.params.id);
    const original_candidate = project.candidate;
    original_candidate.push(`${req.body.freelancer_id}`);
    const new_candidate = original_candidate;
    const updated = await Project.findByIdAndUpdate(req.params.id, { candidate: new_candidate }, { new: true })
    res.status(200).json(updated);
}
const accept_freelancer = async (req, res) => {
    const updated = await Project.findByIdAndUpdate(req.params.id, { freelancer_id: req.body.freelancer_id }, { new: true })
    res.status(200).json(updated);
}
const employer_get_project = async (req, res) => {
    const projects = await Project.find({employer_id:req.params.id})
    res.status(200).json(projects);
}
module.exports = {
    post_project,
    get_projects,
    get_project,
    update_project,
    delete_project,
    apply_project,
    accept_freelancer,
    employer_get_project
}