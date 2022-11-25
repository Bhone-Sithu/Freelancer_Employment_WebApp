const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');
const Project = require('../Models/project_model');

const user_count = async (req, res) => {
    let year = req.body.year
    let employer_month = [];
    for (let index = 1; index <= 12; index++) {
        let employers;
        if (index !== 12) employers = await Employer.find({ created_date: { $gte: `${year}-${index}`, $lte: `${year}-${index + 1}` } });
        else employers = await Employer.find({ created_date: { $gte: `${year}-${index}`, $lte: `${year + 1}-01` } });
        employer_month.push(employers.length)
    }
    let freelancer_month = [];
    for (let index = 1; index <= 12; index++) {
        let freelancers;
        if (index !== 12) freelancers = await Freelancer.find({ created_date: { $gte: `${year}-${index}`, $lte: `${year}-${index + 1}` } });
        else freelancers = await Freelancer.find({ created_date: { $gte: `${year}-${index}`, $lte: `${year + 1}-01` } });
        freelancer_month.push(freelancers.length)
    }
    res.status(200).json({ employer_month, freelancer_month })
}
const skillset = async (req, res) => {
    let year = parseInt(req.body.year);
    let next_year = year + 1;
    let skillset = [
        'PHP',
        'JavaScript',
        'Java',
        'Kotlin',
        'Business Analytic',
        'Marketing'
    ]
    let skillset_data = [];
    for (let index = 0; index < skillset.length; index++) {
        let skillset_query = await Project.find({
            // created_date: { $gte: new Date(year,1,1), $lt: new Date(next_year,1,1)}
            $and: [
                { created_date: { $gte: `${year}-01`, $lte: `${year + 1}-01` } },
                {
                    skillset: {
                        $elemMatch: {
                            $eq: skillset[index]
                        }
                    }
                }
            ]


        })
        skillset_data.push(skillset_query.length)
    }
    res.status(200).json(skillset_data)
}
module.exports = { user_count, skillset }