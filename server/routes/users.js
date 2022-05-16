const express = require('express');
const router = express.Router();

module.exports = db => {
  // used by navbar to render the board items in a list
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT *
      FROM users
      ORDER BY users.first_name ASC

    `
    ).then(({ rows: users }) => {
      res.json(
        users.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  router.get('/:user_id/tasks/', (req, res) => {
    const userId = req.params.user_id;
    db.query(
      `
      SELECT
        tasks.id AS id,
        users_tasks.user_id AS user_id,
        users_tasks.task_id AS task_id,
        tasks.board_id AS board_id,
        tasks.name AS task_name,
        tasks.status AS task_status,
        tasks.description AS task_description,
        tasks.due_date AS task_due_date
      FROM users
      JOIN users_tasks ON users_tasks.user_id = users.id
      JOIN tasks ON users_tasks.task_id = tasks.id
      WHERE users.id = $1


    `,
      [userId]
    ).then(({ rows: tasks }) => {
      res.json(
        tasks.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  return router;
};
