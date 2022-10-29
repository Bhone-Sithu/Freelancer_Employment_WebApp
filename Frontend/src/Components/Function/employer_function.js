import axios from "axios"
const employer_register = async (data) =>{
    const employer = {
      email: data.get('email'),
      password: data.get('password'),
      phone: data.get('phone'),
      name: data.get('name'),
      country: data.get('country'),
      company_name: data.get('company_name'),
      company_size: data.get('company_size'),
      company_address: data.get('company_address'),
      industry: data.get('company_industry'),
    };
    console.log("helppppppppppppppp")
    const res = await axios.post(`${process.env.REACT_APP_HOST}api/employers/register`, employer);
    return res.status;
}
const employers_get = () => {
    console.log("hi");
}
const employer_delete = async(id) => {
  const res = await axios.delete(`${process.env.REACT_APP_HOST}api/employers/delete/${id}`)
  return res.status;
}
const employer_update = async (data,id) =>{
  const employer = {
    email: data.get('email'),
    password: data.get('password'),
    phone: data.get('phone'),
    name: data.get('name'),
    country: data.get('country'),
    company_name: data.get('company_name'),
    company_size: data.get('company_size'),
    company_address: data.get('company_address'),
    industry: data.get('company_industry'),
  };
  console.log("helppppppppppppppp")
  const res = await axios.put(`${process.env.REACT_APP_HOST}api/employers/update/${id}`, employer);
  return res.status;
}
export {employer_register, employers_get, employer_delete, employer_update};