import Nav from "./Components/UI/nav";
import Employer_Register from "./Pages/employer_register";
import Freelancer_Register from "./Pages/freelancer_register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/employer_register' element={<Employer_Register/>} />
                    <Route path='/freelancer_register' element={<Freelancer_Register/>} />
                </Routes>
                <Nav />
            </Router>
        </>

    )
}
export default App;