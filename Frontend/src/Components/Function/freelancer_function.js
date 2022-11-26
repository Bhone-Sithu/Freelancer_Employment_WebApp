import axios from "axios"
const freelancer_register = async (data) =>{
    // e.preventDefault();
    // const data = new FormData(e.currentTarget);
    const freelancer = {
      email: data.get('email'),
      password: data.get('password'),
      phone: data.get('phone'),
      name: data.get('name'),
      country: data.get('country'),
      language: data.get('language').split(','),
      skillset: data.get('skillset').split(','),
    };
    const res = await axios.post(`${process.env.REACT_APP_HOST}api/freelancers/register`, data);
    return res.status;
}
const freelancers_get = () => {
    console.log("hi");
}
const freelancer_delete = async(id) => {
  const res = await axios.delete(`${process.env.REACT_APP_HOST}api/freelancers/delete/${id}`)
  return res.status;
}
const freelancer_update = async(data) => {

}
export {freelancer_register, freelancers_get,freelancer_delete, freelancer_update};