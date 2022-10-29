const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');
const Project = require('../Models/project_model');

const line_chart = async(req,res)=>{
    let employer_month = [];
    for (let index = 1; index <= 12; index++) {
        let employers;
        if(index!==12)  employers= await Employer.find({created_date: { $gte: `2022-${index}`, $lte: `2022-${index+1}` }});
        else  employers = await Employer.find({created_date: { $gte: `2022-${index}`, $lte: `2023-01` }});
        employer_month.push(employers.length)
    }
    let freelancer_month = [];
    for (let index = 1; index <= 12; index++) {
        let freelancers;
        if(index!==12)  freelancers= await Freelancer.find({created_date: { $gte: `2022-${index}`, $lte: `2022-${index+1}` }});
        else  freelancers = await Freelancer.find({created_date: { $gte: `2022-${index}`, $lte: `2023-01` }});
        freelancer_month.push(freelancers.length)
    }
    res.status(200).json({employer_month,freelancer_month})
}
module.exports = {line_chart}