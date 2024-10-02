import express from 'express';
import { pool } from '../connection/db';
import { DEV_NOTES } from '../constants/paths';
import { createNoteSchema, paginatedNoteParamsSchema, updateNoteSchema } from '../models/devNotesModel';
import { responseDto } from '../lib/responseDto';
import { DevNote, TPagination } from '../types/types';

const router = express.Router();

// Create new note
router.post(DEV_NOTES, async(req, res) => {
    try {  
        const { error, value } = createNoteSchema.validate(req.body);
        const { title, category, content, author_id } = value;

        const errorResponse = responseDto<null>({
            data: null,
            successMessage: null,
            statusCode: 400,
            errorMessage: error?.details[0].message
        })

        const successResponse = responseDto<DevNote>({
            data: {
                title,
                category,
                content,
                author_id
            },
            successMessage: "Successfully created note!",
            statusCode: 200,
            errorMessage: null
        })

        if (error) {
            return res.status(400).json(errorResponse)
        }

        await pool.query("INSERT INTO tbl_devnotes (title, category, content, author_id) VALUES($1, $2, $3, $4)", [title, category, content, author_id])
    
         res.json(successResponse)
    } catch (error) {
        res.status(500).json(
            responseDto<null>({
                data: null,
                successMessage: null,
                statusCode: 500,
                errorMessage: error?.message
            })
        );
    }
});

// Update note
router.put(`${DEV_NOTES}/:id`, async(req, res) => {
    try {
        const { id } = req.params
        const { error, value } = updateNoteSchema.validate(req.body);
        const { title, category, content} = value;

        const errorResponse = responseDto<null>({
            data: null,
            successMessage: null,
            statusCode: 400,
            errorMessage: error?.details[0].message
        })

        const successResponse = responseDto<{title: string, category:string, content: string}>({
            data: {
                title,
                category,
                content,
            },
            successMessage: "Successfully updated note!",
            statusCode: 200,
            errorMessage: null
        })

        if (error) {
            return res.status(400).json(errorResponse)
        }

         await pool.query("UPDATE tbl_devnotes SET title = $1, category = $2, content = $3, date_created = NOW() WHERE devnote_id = $4", [title, category, content, id])

         res.json(successResponse)
    } catch (error) {
        res.status(500).json(
            responseDto<null>({
                data: null,
                successMessage: null,
                statusCode: 500,
                errorMessage: error?.message
            })
        );
    }
});

// Delete note
router.delete(`${DEV_NOTES}/:id`, async(req, res) => {
    try {
        const { id } = req.params;
      await pool.query("DELETE FROM tbl_devnotes WHERE devnote_id = $1", [id]);

        res.json("Successfully deleted note!");

        if(!id){
            res.status(400).json("Please provide a valid id.")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }

})

// Get notes by authorId
router.get(DEV_NOTES, async (req, res) => {
    const {error, value} = paginatedNoteParamsSchema.validate(req.query);
    const { search, author_id, sort_direction, category, page_size, page_number } = value
    
    //Sort direction values: 1 = Descending 0 = Ascending
    const sortDirection = sort_direction === "1" ? "DESC" : "ASC"
    const pageNumber = Number(page_number)


    try {
        let queryText = "SELECT * FROM tbl_devnotes WHERE author_id = $1";
        let queryParams = [author_id];

        if(category){
            queryText += ` AND category = $2`;
            queryParams.push(category);
        }

        if(search){
            queryText += ` AND title LIKE '%${search}%' OR content LIKE '%${search}%'`
        }

        // Data that will handle the totalPages value
        const allDevNote = await pool.query(queryText, queryParams);

        queryText += ` ORDER BY date_created ${sortDirection}`
       
        if(page_size && page_number){
            queryText += ` LIMIT ${page_size} OFFSET (${pageNumber - 1}) * ${page_size}`
        }

        const errorResponse = responseDto<null>({
            data: null,
            successMessage: null,
            statusCode: 400,
            errorMessage: error?.details[0].message
        })

        if(error){
            return res.status(400).json(errorResponse)
        }

        const devNote = await pool.query(queryText, queryParams)
       

        const successResponse = responseDto<{items: DevNote[]} & TPagination>({
            data: {
                items: devNote?.rows?.filter((item) => item.author_id === author_id),
                totalPages: allDevNote.rowCount,
                pageNumber: pageNumber,
                pageSize: page_size
            },
            successMessage: null,
            statusCode: 200,
            errorMessage: null
        })

        res.json(successResponse)
    } catch (err) {
        res.status(500).json(
            responseDto<null>({
                data: null,
                successMessage: null,
                statusCode: 500,
                errorMessage: err?.message
            })
        );
    }
});

// Get all categories create by author
router.get(`${DEV_NOTES}/categories`, async (req, res) => {
    const { author_id } = req.query;

    try {
        const categoriesData = await pool.query("SELECT DISTINCT ON (category) category FROM tbl_devnotes WHERE author_id = $1 ORDER BY category ASC", [author_id]);
        const mappedCategoriesData = categoriesData.rows.map(({ category }) => category)

        res.json(mappedCategoriesData);

        if(!author_id){
            res.status(400).json("Please provide a valid author id.")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// Get note by id
router.get(`${DEV_NOTES}/:id`, async (req, res) => {
    const { id } = req.params;

    try {
        const devNote = await pool.query("SELECT * FROM tbl_devnotes WHERE devnote_id = $1", [id])
        
        res.json(devNote.rows[0])
        if(!id){
            res.status(400).json("Please provide a valid note id.")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }

});

export default router