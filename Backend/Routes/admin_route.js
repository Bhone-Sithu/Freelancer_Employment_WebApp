const express = require('express');
const router = express.Router(); 
const {approve_account,
    approve_project,
    get_admins,
    get_admin,
    register_admin,
    get_unapproved_employers,
    get_unapproved_freelancers,
    get_unapproved_projects} = require('../Controllers/admin_controller')
router.get('/get',get_admins);
router.post('/register',register_admin);
router.get('/get/:id',get_admin);
router.get('/get_unapproved_employers',get_unapproved_employers);
router.get('/get_unapproved_freelancers',get_unapproved_freelancers);
router.get('/get_unapproved_projects',get_unapproved_projects);
router.put('/approve_account/:id',approve_account);
router.put('/approve_project/:id',approve_project);

module.exports = router;