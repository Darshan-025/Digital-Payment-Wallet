const zod = require('zod');

// User schema
const userzod = zod.object({
    username: zod.string(),
    password: zod.string()
});

// Update password schema
const updatezod = zod.object({
    username: zod.string(),
    oldpassword: zod.string(),
    newpassword: zod.string()
});

module.exports = { userzod, updatezod };