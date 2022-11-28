const Admin = require('../Models/admin_model');
const Employer = require('../Models/employer_model');
const Freelancer = require('../Models/freelancer_model');
const Project = require('../Models/project_model');
const Chat = require("../Models/chat_model");
const { faker } = require('@faker-js/faker');
const Payment = require('../Models/payment_model');
const Dashboard = require('../Models/dashboard_model');

const run = async (req, res) => {
    // delete_all();
    create_all();

    res.status(200).json({ hi: "ok" })
}
const delete_all = async () => {
    await Employer.deleteMany({});
    await Freelancer.deleteMany({});
    await Project.deleteMany({});
    await Chat.deleteMany({});
    await Payment.deleteMany({});
    await Dashboard.deleteMany({});
}
const create_all = async () => {
    await create_employer();
    await create_freelancer();
    await create_project();
}
const create_employer = async () => {
    // Employer
    for (let index = 0; index <= 100; index++) {
        let names = faker.name.fullName();

        const employer = {
            email: faker.internet.email(names),
            password: "123",
            name: names,
            phone: faker.phone.number(),
            country: faker.address.country(),
            company_name: faker.company.name(),
            company_size: faker.datatype.number({ min: 0, max: 1000 }),
            is_approved: faker.helpers.arrayElement([true]),
            company_address: faker.address.streetAddress(true),
            role: "employer",
            currency: 0,
            created_date: faker.date.past(2),
            profile_photo: "Files/User/user.png"
        }
        const res = await Employer.create(employer);
    }

}
const create_freelancer = async () => {
    // Freelancer

    for (let index = 0; index <= 100; index++) {
        let names = faker.name.fullName();
        const freelancer = {
            email: faker.internet.email(names),
            password: "123",
            name: names,
            phone: faker.phone.number(),
            country: faker.address.country(),
            is_approved: faker.helpers.arrayElement([true]),
            skillset: faker.helpers.arrayElements(['PHP',
                'JavaScript',
                'Java',
                'Kotlin',
                'Business Analytic',
                'Marketing']),
            language: faker.helpers.arrayElements(["English", "Myanmar", "Japanese", "Chinese", "French", "Korean"]),
            role: "freelancer",
            currency: 0,
            created_date: faker.date.past(2),
            profile_photo: "Files/User/user.png",
            cv: "Files/User/_BST_CV.pdf"
        }

        const registered = await Freelancer.create(freelancer);
    }
}
const create_project = async () => {
    // Project
    const employers = await Employer.find({ is_approved: true })
    let employer_array = employers.map(employer => {
        return employer._id
    })
    const freelancers = await Freelancer.find({ is_approved: true })
    let freelancer_array = freelancers.map(freelancer => {
        return freelancer._id
    })
    for (let index = 0; index <= 100; index++) {
        const project = {
            employer_id: faker.helpers.arrayElement(employer_array),
            freelancer_id: "",
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            is_approved: faker.helpers.arrayElement([true]),
            skillset: faker.helpers.arrayElements(['PHP',
                'JavaScript',
                'Java',
                'Kotlin',
                'Business Analytic',
                'Marketing']),
            language: faker.helpers.arrayElements(["English", "Myanmar", "Japanese", "Chinese", "French", "Korean"]),
            candidate: faker.helpers.arrayElements(freelancer_array, 5),
            payment: faker.commerce.price(1, 99999, 0),
            created_date: faker.date.past(1),
            deadline: faker.date.future(1),
            dashboard_id: "",
            expire_date: faker.commerce.price(1, 15, 0)

        }

        const registered = await Project.create(project);
    }
}


module.exports = run