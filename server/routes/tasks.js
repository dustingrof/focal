
const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // don't need 
  // router.get("/", (req, res) => {
  //   const boardId = req.params.id;
  //   console.log("boardId:", boardId);
  //   db.query(
  //     `
  //     SELECT * 
  //     FROM tasks
  //     ORDER BY tasks.id

  //   `, [boardId]
  //   ).then(({ rows: tasks }) => {
  //     res.json(
  //       tasks.reduce(
  //         (previous, current) => ({ ...previous, [current.id]: current }),
  //         {}
  //       )
  //     );
  //   });
  // });












  return router;
};
