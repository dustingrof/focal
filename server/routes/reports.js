const express = require('express');
const router = express.Router();

module.exports = db => {
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT
        boards.name as board_name,
        sum(total_time_sec) as board_time
        FROM tasks
        JOIN boards ON tasks.board_id = boards.id
        GROUP BY board_name
        ORDER BY boards.name
    `
    ).then(({ rows: reports }) => {
      res.json(
        reports.reduce(
          (previous, current) => ({
            ...previous,
            [current.board_name]: current,
          }),
          {}
        )
      );
    });
  });

  return router;
};
