import axios from "axios"
const approve = async(id) => {
    const res = await axios.put(process.env.REACT_APP_HOST + `api/admins/approve_account/${id}`)
    return res.status;
    

}
const approve_project = async(id) => {
    const res = await axios.put(process.env.REACT_APP_HOST + `api/admins/approve_project/${id}`)
    return res.status;
    
}
const reject_account = async(id) => {
    const res = await axios.put(process.env.REACT_APP_HOST + `api/admins/reject_account/${id}`)
    return res.status;
}
const reject_project = async(id) => {
    const res = await axios.put(process.env.REACT_APP_HOST + `api/admins/reject_project/${id}`)
    return res.status;
    
}
const start = async(id)=>{ //start_project
    const created_dashboard = await axios.post(process.env.REACT_APP_HOST + `api/dashboards/create_dashboard`)
    const updated_project = await axios.put(process.env.REACT_APP_HOST + `api/projects/update/${id}`, {dashboard_id:created_dashboard.data._id})
    return updated_project.status;
}
export {approve,approve_project,reject_account,reject_project,start}