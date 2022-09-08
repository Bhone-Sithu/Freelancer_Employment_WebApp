import axios from "axios"
const approve = async(id) => {
    const res = await axios.put(process.env.REACT_APP_HOST + `api/admins/approve_account/${id}`)
    return res.status;
    

}
const approve_project = async(id) => {
    const res = await axios.put(process.env.REACT_APP_HOST + `api/admins/approve_project/${id}`)
    return res.status;
    
}
export {approve,approve_project}