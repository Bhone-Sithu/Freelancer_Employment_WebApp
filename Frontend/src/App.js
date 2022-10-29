import Nav from "./Components/UI/nav";
import Employer_Register from "./Pages/employer_register";
import Freelancer_Register from "./Pages/freelancer_register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import Admin_Dashboard from "./Pages/admin_dashboard"
import Post_Project from "./Pages/post_project"
import Project_Feed from "./Pages/project_feed"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Project_Detail from "./Pages/project_detail"
import Freelancer_View from "./Pages/freelancer_view"
import Payment from "./Pages/payment"
import Project_Dashboard from "./Pages/project_dashboard"

const App = () => {
    return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Router>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/freelancer_view/:id' element={<Freelancer_View />} />
                        <Route path='/project_detail/:id' element={<Project_Detail/>} />
                        <Route path='/post_project' element={<Post_Project />} />
                        <Route path='/payment' element={<Payment />} />
                        <Route path='/project_feed/*' element={<Project_Feed />} />
                        <Route path='/admin_dashboard/*' element={<Admin_Dashboard />} />
                        <Route path='/project_dashboard/:id/*' element={<Project_Dashboard />} />
                        <Route path='/employer_register' element={<Employer_Register />} />
                        <Route path='/freelancer_register' element={<Freelancer_Register />} />
                    </Routes>
                </Router>
            </LocalizationProvider>
    )
}
export default App;