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
      SELECT tasks.id, board_id, status, boards.name as board_name, title, due_date, string_to_array(array_of_users, ', ') AS users, array_of_users, total_time_sec, tasks.description AS description
      FROM TASKS
      JOIN boards on boards.id = tasks.board_id
      ORDER BY due_date DESC
    `,
      []
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
