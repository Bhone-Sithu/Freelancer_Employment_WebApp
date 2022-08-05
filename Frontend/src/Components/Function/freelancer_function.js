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
    // const res = await axios.post('/api/freelancers/register', freelancer);
    // return res.status;
    console.log(freelancer);
}
const freelancers_get = () => {
    console.log("hi");
}
export {freelancer_register, freelancers_get};