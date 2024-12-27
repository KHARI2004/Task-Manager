const express = require('express');
const db = require('../db/dbConfig');
const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new task
router.post('/', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    db.query(query, [title, description], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, title, description });
    });
});

// Update a task's status
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const query = 'UPDATE tasks SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task updated' });
    });
});

// Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Task deleted' });
    });
});

module.exports = router;