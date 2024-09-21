import express from 'express';
import { pool } from '../connection/db';
import { USERS } from '../constants/paths';
import { createUserSchema } from '../models/userModel';

const router = express.Router();

// Create user in table
router.post(USERS, async (req, res) => {
    try {
       const { error, value } = createUserSchema.validate(req.body);
       if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

        const { user_id, first_name, last_name } = value;
        await pool.query("INSERT INTO tbl_users (user_id, first_name, last_name) VALUES ($1, $2, $3)", [user_id, first_name, last_name]);

        res.json("Created new user!")
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Check if user already exist
router.get(`${USERS}/is-user-exist/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const userResponse = await pool.query("SELECT * FROM tbl_users WHERE user_id = $1", [id]);

        const userDoesExist = userResponse.rows.length > 0;

        res.json(userDoesExist)

    } catch (error) {
        res.status(500).json(error.message);
    }
})



export default router