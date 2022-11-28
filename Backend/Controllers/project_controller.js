const Project = require('../Models/project_model');
const Freelancer = require('../Models/freelancer_model');
const { faker } = require('@faker-js/faker');
const post_project = async (req, res) => {
    const project = {
        employer_id: req.body.employer_id,
        freelancer_id: "",
        admin_id: "62e35dca871c083794990585",
        title: req.body.title,
        description: req.body.description,
        skillset: req.body.skillset,
        language: req.body.language,
        candidate: [],
        payment: req.body.payment,
        expire_date: 15,
        deadline: req.body.deadline,
        dashboard_id: "",
        is_approved: false,
        created_date: Date.now()
    }
    // for (let index = 1; index <= 50; index++) {
    //     const project = {
    //         employer_id: "62ecacb4ad55966fa4f37af5",
    //         freelancer_id: "",
    //         title: `Project ${index}`,
    //         description: `Project ${index} Project ${index} Project ${index} Project ${index} Project ${index} Project ${index} Project ${index} Project ${index} Project ${index}`,
    //         skillset: ["Business", "PHP", "JavaScript"],
    //         language: ["Japanese", "English", "Burmese"],
    //         candidate: ["62e29f63ecd208dbea756d7c", "62edda9f96515e298eefa266", "6310cfe76f3f8b7ad5a73997", "6310cf4604c2b6a750b70701", "6310d1a76f3f8b7ad5a744e1"],
    //         payment: 400,
    //         expire_date: 15,
    //         deadline: "2023-09-24T17:30:00.000Z",
    //         dashboard_id: "",
    //         is_approved: false
    //     }
    //     const posted = await Project.create(project);
    // }
    const posted = await Project.create(project);
    res.status(201).json({ messag: "Your project post has been requested" });
}
const get_projects = async (req, res) => {
    const projects = await Project.find({ is_approved: true });
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
        dashboard_id: req.body.dashboard_id
    }
    const updated = await Project.findByIdAndUpdate(req.params.id, project, { new: true });
    res.status(200).json(updated);
}
const delete_project = async (req, res) => {
    const deleted = await Project.findByIdAndDelete(req.params.id);
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
const invite_freelancer = async (req, res) => {
    const freelancer = await Freelancer.findById(req.params.id);
    const original_invitations = freelancer.invitations;
    original_invitations.push(`${req.body.invite_id}`);
    const new_invitations = original_invitations;
    const updated = await Freelancer.findByIdAndUpdate(req.params.id, { invitations: new_invitations }, { new: true })
    res.status(200).json(updated);
}
const employer_get_project = async (req, res) => {
    const projects = await Project.find({ employer_id: req.params.id })
    res.status(200).json(projects);
}
const freelancer_get_project = async (req, res) => {
    const projects = await Project.find({ freelancer_id: req.params.id })
    res.status(200).json(projects);
}
const project_filter = async (req, res) => {
    const skill = req.body.skillset;
    const lang = req.body.language;
    let projects;
    if (skill != "" && lang != "") {
        projects = await Project.find({
            is_approved: true,
            $and: [
                {
                    skillset: {
                        $elemMatch: {
                            $eq: skill
                        }
                    }
                },
                {
                    language: {
                        $elemMatch: {
                            $eq: lang
                        }
                    }
                }
            ]

        })
    }
    else {
        projects = await Project.find({
            is_approved: true,
            $or: [
                {
                    skillset: {
                        $elemMatch: {
                            $eq: skill
                        }
                    }
                },
                {
                    language: {
                        $elemMatch: {
                            $eq: lang
                        }
                    }
                }
            ]

        })
    }

    res.status(200).json(projects);
}
const project_search = async (req, res) => {
    const search = await Project.find({
        is_approved: true,
        title: {
            $regex: '.*' + req.body.name + '.*',
            $options: 'i'
        }
    })
    res.status(200).json(search);
}
const project_update_from_admin = async(req,res) => {
    console.log(req.body)
    
    const project = {
        title: req.body.title,
        description: req.body.description,
        skillset: req.body.skillset.split(","),
        language: req.body.language.split(","),
        payment: req.body.payment,
        deadline: req.body.deadline,
    }
    const update = await Project.findByIdAndUpdate(req.params.id,project)
    res.status(200).json(update)
}
module.exports = {
    post_project,
    get_projects,
    get_project,
    update_project,
    delete_project,
    apply_project,
    accept_freelancer,
    employer_get_project,
    invite_freelancer,
    project_filter,
    project_search,
    project_update_from_admin,
    freelancer_get_project
}