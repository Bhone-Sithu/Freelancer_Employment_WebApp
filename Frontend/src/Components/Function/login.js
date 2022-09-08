import axios from "axios"
const login = async (e) => {
    e.preventDefault();
    
    const data = new FormData(e.currentTarget);
    const login = {
        email: data.get('email'),
        password: data.get('password'),
    };
    console.log(login);
    let response;
    await axios.post(`${process.env.REACT_APP_HOST}api/login`, login).then((res) => {
        console.log(res);
        response = {
            status: res.status,
            message: res.data.message,
            role:res.data.role,
            id:res.data.id
        };
    }).catch((err) => {
        console.log(err);
        response = {
            status: err.response.status,
            message: err.response.data.message,
            role:err.response.data.role,
            id:err.response.data.id
        }
    })
    
    return response;

}
export { login };