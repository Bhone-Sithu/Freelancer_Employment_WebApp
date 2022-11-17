const Dashboard = require('../Models/dashboard_model');
const create_dashboard = async (req, res) => {
    const dashboard = {
        requirement: "",
        progress: 0,
        version: "0",
        project_demo: "",
        project_file: "",
        is_complete: false
    }
const created = await Dashboard.create(dashboard);
res.status(201).json(created);
}

const get_dashboard = async (req, res) => {
    const dashboard = await Dashboard.findById(req.params.id);
    res.status(200).json(dashboard)
}
const update_dashboard = async (req, res) => {
    const dashboard = {
        requirement: req.body.requirement,
        progress: req.body.progress,
        version: req.body.version,
        project_demo: req.body.project_demo,
        project_file: req.body.project_file
    }
    const updated = await Dashboard.findByIdAndUpdate(req.params.id, dashboard, { new: true });
    res.status(200).json(updated);
}
const upload_file = async(req,res)=>{
    const file = {
        project_file:req.file.path.substring(8),
    }
    const updated = await Dashboard.findByIdAndUpdate(req.params.id, file, { new: true });
    res.status(200).json(updated);

}
module.exports = {
    create_dashboard,
    get_dashboard,
    update_dashboard,
    upload_file
}