const Dashboard = require('../Models/dashboard_model');
const give_rating = async(req,res)=>{
    const rating = {
        star : req.body.star,
        feedback : req.body.feedback
    }
    if(req.body.rate_to == "employer")
    {
        const employer_rate = await Dashboard.findByIdAndUpdate(req.params.id,{employer_rating:rating},{new:true})
        res.status(200).json(employer_rate)
    }
    if(req.body.rate_to == "freelancer")
    {
        const freelancer_rate = await Dashboard.findByIdAndUpdate(req.params.id,{freelancer_rating:rating},{new:true})
        res.status(200).json(freelancer_rate)
    }
}
module.exports = {give_rating}