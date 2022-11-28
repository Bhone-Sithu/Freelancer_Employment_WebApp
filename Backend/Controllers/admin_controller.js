const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');
const Project = require('../Models/project_model');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: 'lancer_system@outlook.com',
        pass: 'Bhonesithu1418'
    }
});

const register_admin = async (req, res) => {
    const admin = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: 09123456789,
        role: "admin",
        currency: 0
    }
    const registered = await Admin.create(admin);
    res.status(201).json(registered);
}

const get_admins = async (req, res) => {
    const admins = await Admin.find({});
    res.status(200).json(admins)
}
const get_admin = async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    res.status(200).json(admin)
}
const get_unapproved_employers = async (req, res) => {
    const unapproved_employer = await Employer.find({ is_approved: false });
    const unapproved_freelancer = await Freelancer.find({ is_approved: false });
    res.status(200).json([...unapproved_employer])
}
const get_unapproved_freelancers = async (req, res) => {
    const unapproved_freelancer = await Freelancer.find({ is_approved: false });
    res.status(200).json([...unapproved_freelancer])
}
const get_unapproved_projects = async (req, res) => {

    const unapproved_project = await Project.find({ is_approved: false });
    res.status(200).json(unapproved_project)
}
const approve_account = async (req, res) => {
    const unapproved = await Employer.findById(req.params.id);
    let approved;
    
    if (unapproved) {
        approved = await Employer.findByIdAndUpdate(req.params.id, { is_approved: true }, { new: true });
        

        var mailOptions = {
            from: 'lancer_system@outlook.com',
            to: approved.email,
            subject: 'Employer Account Approval',
            text: 'Congratulation! Your Employer account registration has been accepted by our admin. You can now login to our website and use our services'
        };

    } else {
        approved = await Freelancer.findByIdAndUpdate(req.params.id, { is_approved: true }, { new: true });

        var mailOptions = {
            from: 'lancer_system@outlook.com',
            to: approved.email,
            subject: 'Freelancer Account Approval',
            text: 'Congratulation! Your freelancer account registration has been accepted by our admin. You can now login to our website and use our services'
        };
        
        
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error: " + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json(approved);
}
const reject_account = async (req, res) => {
    const unapproved = await Employer.findById(req.params.id);
    let approved;
    
    if (unapproved) {
        approved = await Employer.findByIdAndDelete(req.params.id);
        

        var mailOptions = {
            from: 'lancer_system@outlook.com',
            to: approved.email,
            subject: 'Employer Account Rejection',
            text: 'We are sorry to inform that your Employer account registration has been rejected by our admin. This happen due to your provided detail do not meet our Lancer\'s background checking guideline. You have to register again with more reasonable details.'
        };

    } else {
        approved = await Freelancer.findByIdAndDelete(req.params.id);

        var mailOptions = {
            from: 'lancer_system@outlook.com',
            to: approved.email,
            subject: 'Freelancer Account Rejection',
            text: 'We are sorry to inform that your Freelancer account registration has been rejected by our admin. This happen due to your provided detail do not meet our Lancer\'s background checking guideline. You have to register again with more reasonable details.'
        };
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json(approved);
}
const approve_project = async (req, res) => {
    let approved = await Project.findByIdAndUpdate(req.params.id, { is_approved: true, }, { new: true });
    let employer = await Employer.findById(approved.employer_id);
    var mailOptions = {
        from: 'lancer_system@outlook.com',
        to: employer.email,
        subject: 'Project Post Request  Approval',
        text: 'Your project\'s post request has been accepted by our admin. You can accept a freelancer or invite for your project. After confirming a freelancer, you must transfer the project\'s payment to admin as a deposit in order to start the project.'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json(approved);
}
const reject_project = async (req, res) => {
    let approved = await Project.findByIdAndDelete(req.params.id);
    let employer = await Employer.findById(approved.employer_id);
    var mailOptions = {
        from: 'lancer_system@outlook.com',
        to: employer.email,
        subject: 'Project Post Request  Rejection',
        text: 'Your project\'s post request has been rejected by our admin. This happen due to your provided detail do not meet our Lancer\'s background checking guideline. You have to register again with more reasonable details.'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json(approved);
}
module.exports = {
    approve_account,
    approve_project,
    get_admins,
    get_admin,
    get_unapproved_employers,
    get_unapproved_projects,
    reject_project,
    get_unapproved_freelancers,
    reject_account,
    register_admin
}