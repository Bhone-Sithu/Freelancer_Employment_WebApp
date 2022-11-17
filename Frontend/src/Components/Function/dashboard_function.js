import axios from 'axios'
const update_dashboard = async(title,form_data,data) => {
    const dashboard = {
        requirement : data.requirement,
        progress : data.progress,
        version : data.version,
        project_demo : data.project_demo,
        project_file : data.project_file,
        is_complete : data.is_complete,
    }
    if(title == "Update Requirement") dashboard.requirement = form_data.text;
    if(title == "Update Progress")
    {
        dashboard.progress = form_data.progress;
        dashboard.version = form_data.text;
    }
    if(title == "Edit Demo") dashboard.project_demo = form_data.text;
    if(title == "Upload File") dashboard.project_file= form_data.text;

    let res = await axios.put(process.env.REACT_APP_HOST + `api/dashboards/update/${data._id}`,dashboard)
        return res.status;
}
const upload = async(file,data) => {
    const form_data = new FormData();
    form_data.append('file',file);
    let res = await axios.put(process.env.REACT_APP_HOST + `api/dashboards/upload/${data._id}`,form_data)
    return res.status;

}
export {update_dashboard,upload}