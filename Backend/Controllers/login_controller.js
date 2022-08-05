const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');
const login = async (req, res) => {
    const { email, password } = req.body;
    let login_account = await Admin.findOne({ email: email, password: password });
    if (login_account)
        return res.status(200).json({
            message: 'Admin Login successful',
            data: login_account
        })
    login_account = await Employer.findOne({ email: email, password: password });
    if (login_account)
        return res.status(200).json({
            message: 'Employer Login successful',
            data: login_account
        })
    login_account = await Freelancer.findOne({ email: email, password: password });
    if(login_account)
        return res.status(200).json({
            message: 'Freelancer Login successful',
            data: login_account
        })
    else
        res.status(400).json({
            message: 'Bad Request Login Failed'
        })
}

module.exports = login;