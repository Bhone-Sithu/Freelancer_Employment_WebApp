const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');
const Payment = require('../Models/payment_model');

const topup = async (req, res) => {
    let topup_account = await Admin.findById(req.params.id);
    if (topup_account) {
        let updated = await Admin.findByIdAndUpdate(topup_account.id, { currency: Number(topup_account.currency) + Number(req.body.currency) })
        await Payment.create({
            sender_id:updated._id,
            receiver_id:"",
            currency:req.body.currency,
            transaction_type:"Top Up",
            timestamp:Date.now()
        })
        return res.status(200).json({
            message: 'Admin topup successful.',
            role: "admin",
            id: topup_account.id
        })
    }
    topup_account = await Employer.findById(req.params.id);
    if (topup_account) {
        let updated = await Employer.findByIdAndUpdate(topup_account.id, { currency: Number(topup_account.currency) + Number(req.body.currency) })
        await Payment.create({
            sender_id:updated._id,
            receiver_id:"",
            currency:req.body.currency,
            transaction_type:"Top Up",
            timestamp:Date.now()
        })
        return res.status(200).json({
            message: 'Employer topup successful.',
            role: "employer",
            id: topup_account.id
        })
    }

    topup_account = await Freelancer.findById(req.params.id);
    if (topup_account) {
        let updated = await Admin.findByIdAndUpdate(topup_account.id, { currency: Number(topup_account.currency) + Number(req.body.currency) })
        await Payment.create({
            sender_id:updated._id,
            receiver_id:"",
            currency:req.body.currency,
            transaction_type:"Top Up",
            timestamp:Date.now()
        })
        return res.status(200).json({
            message: 'Employer topup successful. You will be redirected to employer Dashboard in 5 seconds.',
            role: "employer",
            id: topup_account.id
        })
    }
    else
        res.status(400).json({
            message: 'Sorry something went wrong. Please try again later.'
        })
}

const withdraw = async (req, res) => {
    let withdraw_account = await Admin.findById(req.params.id);
    if (withdraw_account) {
        let updated = await Admin.findByIdAndUpdate(withdraw_account.id, { currency: (withdraw_account.currency - req.body.currency) })
        await Payment.create({
            sender_id:updated._id,
            receiver_id:"",
            currency:req.body.currency,
            transaction_type:"Withdraw",
            timestamp:Date.now()
        })
        return res.status(200).json({
            message: 'Admin withdraw successful.',
            role: "admin",
            id: withdraw_account.id
        })
    }
    withdraw_account = await Employer.findById(req.params.id);
    if (withdraw_account) {
        let updated = await Employer.findByIdAndUpdate(withdraw_account.id, { currency: (withdraw_account.currency - req.body.currency) })
        await Payment.create({
            sender_id:updated._id,
            receiver_id:"",
            currency:req.body.currency,
            transaction_type:"Withdraw",
            timestamp:Date.now()
        })
        return res.status(200).json({
            message: 'Employer withdraw successful.',
            role: "employer",
            id: withdraw_account.id
        })
    }

    withdraw_account = await Freelancer.findById(req.params.id);
    if (withdraw_account) {
        let updated = await Admin.findByIdAndUpdate(withdraw_account.id, { currency: (withdraw_account.currency - req.body.currency) })
        await Payment.create({
            sender_id:updated._id,
            receiver_id:"",
            currency:req.body.currency,
            transaction_type:"Withdraw",
            timestamp:Date.now()
        })
        return res.status(200).json({
            message: 'Freelancer withdraw successful. You will be redirected to employer Dashboard in 5 seconds.',
            role: "freelancer",
            id: withdraw_account.id
        })
    }
    else
        res.status(400).json({
            message: 'withdraw Credentials invalid'
        })
}
const transfer = async (req, res) => {
    let sender = await Admin.findById(req.body.sender_id);
    if (sender) {
        let sender_updated = await Admin.findByIdAndUpdate(sender._id, { currency: (sender.currency - req.body.currency) })
        let receiver = await Freelancer.findById(req.body.receiver_id)
        let receiver_updated = await Freelancer.findByIdAndUpdate(req.body.receiver_id, { currency: (receiver.currency + req.body.currency) })
        await Payment.create({
            sender_id:sender_updated._id,
            receiver_id:receiver_updated._id,
            currency:req.body.currency,
            transaction_type:"Transfer",
            timestamp:Date.now()
        })
        return res.status(200).json({
            message: `Admin transfer successful. ${req.body.currency} has been transferred to ${receiver_updated.name}`,
            role: "admin",
        })
    }
    sender = await Employer.findById(req.body.sender_id);
    if (sender) {
        let receiver = await Admin.findById(req.body.receiver_id)
        if (receiver) {
            let sender_updated = await Employer.findByIdAndUpdate(sender._id, { currency: (sender.currency - req.body.currency) })
            let receiver_updated = await Admin.findByIdAndUpdate(req.body.receiver_id, { currency: Number(receiver.currency) + Number(req.body.currency) })
            await Payment.create({
                sender_id:sender_updated._id,
                receiver_id:receiver_updated._id,
                currency:req.body.currency,
                transaction_type:"Transfer",
                timestamp:Date.now()
            })
            return res.status(200).json({
                message: `Employer transfer successful. ${req.body.currency} has been transferred to ${receiver.name}`,
                role: "employer",
                id: sender.id
            })
        } else
            res.status(400 ).json({
                message: 'Somethine went wrong in Transferring. Please check the receiver id carefully.'
            })

    }
    else
        res.status(400).json({
            message: 'Somethine went wrong in Transferring. Please check the receiver id carefully.'
        })
}
const get_payment = async(req,res)=>{
    let history = await Payment.find({$or:[{sender_id:req.params.id},{receiver_id:req.params.id}]})
    res.status(200).json(history);
}
module.exports = { topup, withdraw, transfer, get_payment };