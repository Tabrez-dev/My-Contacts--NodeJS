const express = require('express');
const validateToken = require('../middleware/validatetokenhandler');
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
} = require('../controllers/contactController');

const router = express.Router();
router.get('/', validateToken, getContacts);

router.post('/', validateToken, createContact);

router.get('/:id', validateToken, getContact);

router.put('/:id', validateToken, updateContact);

router.delete('/:id', validateToken, deleteContact);

module.exports = router;
