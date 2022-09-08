import axios from "axios"
const post_project = async (data) =>{
    // e.preventDefault();
    // const data = new FormData(e.currentTarget);
    const project = {
      title: data.get('title'),
      description: data.get('description'),
      payment: data.get('payment'),
      deadline: data.get('deadline'),
      language: data.get('language').split(','),
      skillset: data.get('skillset').split(','),
    };
    const res = await axios.post(`${process.env.REACT_APP_HOST}api/projects/post`, project);
    return res.status;
}
const projects_get = () => {
    console.log("hi");
}
const project_delete = async (id) => {
  const res = await axios.delete(`${process.env.REACT_APP_HOST}api/projects/delete`, id);
  return res.status;
}
const apply_project = async (project_id, freelancer_id) => {
  const res = await axios.put(`${process.env.REACT_APP_HOST}api/projects/apply/${project_id}`, {freelancer_id});
  return res.status;
}
export {post_project, projects_get, project_delete, apply_project};