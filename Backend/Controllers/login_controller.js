const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');
const login = async (req, res) => {
    const { email, password } = req.body;
    let login_account = await Admin.findOne({ email: email, password: password });
    if (login_account)
        return res.status(200).json({
            message: 'Admin Login successful. You will be redirected to Admin Dashboard in 5 seconds.',
            role: "admin",
            id: login_account.id
        })
    login_account = await Employer.findOne({ email: email, password: password });
    if (login_account)
        if (login_account.is_approved == true)
            return res.status(200).json({
                message: 'Employer Login successful. You will be redirected to Project Feed in 5 seconds.',
                role: "employer",
                id: login_account.id
            })
        else
            return res.status(400).json({
                message: 'Employer Login failed. Your account is not approved yet. Please wait an email for the background checking result',
                role: "employer",
                id: login_account.id
            })
    login_account = await Freelancer.findOne({ email: email, password: password });
    if (login_account)
        if (login_account.is_approved == true)
            return res.status(200).json({
                message: 'Freelancer Login successful. You will be redirected to Project Feed in 5 seconds.',
                role: "freelancer",
                id: login_account.id
            })
        else
            return res.status(400).json({
                message: 'Freelancer Login failed. Your account is not approved yet. Please wait an email for the background checking result',
                role: "freelancer",
                id: login_account.id
            })
    else
        res.status(400).json({
            message: 'Login Credentials invalid'
        })
}

module.exports = login;