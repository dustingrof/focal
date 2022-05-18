const express = require('express');
const router = express.Router();

module.exports = db => {
  // used by navbar to render the board items in a list
  router.get('/', (req, res) => {
    db.query(
      `
      SELECT *
      FROM boards
      ORDER BY boards.id

    `
    ).then(({ rows: boards }) => {
      res.json(
        boards.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  // when user clicks "add board" button to create a new board
  router.post('/new', (req, res) => {
    const boardName = req.body.boardName; // use boardName or change here
    const boardDescription = req.body.boardDescription; // use boardDescription or change here
    const boardImage = req.body.boardImage; // use boardImage or change here

    db.query(
      `
      INSERT INTO boards (name, description, image_url)
      VALUES ($1, $2, $3)

    `,
      [boardName, boardDescription, boardImage]
    ).then(({ rows: boards }) => {
      res.json(
        boards.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  // when user clicks on "add task" button
  router.post('/:board_id/tasks/new', (req, res) => {
    const taskName = req.body.taskName;
    const taskDescription = req.body.taskDescription;
    const taskDueDate = req.body.taskDueDate;
    const taskBoardId = req.params.board_id; // this comes from address
    const taskStatus = req.body.taskStatus;

    db.query(
      `
      INSERT INTO tasks (title, description, due_date, board_id, status)
      VALUES ($1, $2, $3, $4, $5)

    `,
      [taskName, taskDescription, taskDueDate, taskBoardId, taskStatus]
    ).then(({ rows: tasks }) => {
      res.json(
        tasks.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  // This is for the board focus view
  router.get('/:board_id', (req, res) => {
    const boardId = req.params.board_id;
    db.query(
      `
      SELECT *
      FROM boards
      WHERE id = $1

    `,
      [boardId]
    ).then(({ rows: boards }) => {
      res.json(
        boards.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  // when user clicks on task card to open task focus view
  // - is this necessary, or do we get all tasks in an object on page load
  // - includes JOIN on query with users_tasks
  router.get('/:board_id/tasks/:task_id', (req, res) => {
    // console.log("params:", req.params);
    const boardId = req.params.board_id;
    const taskId = req.params.task_id;
    db.query(
      `
      SELECT *
      FROM tasks
      JOIN users_tasks ON users_tasks.task_id = tasks.id
      JOIN users ON users_tasks.user_id = users.id
      WHERE board_id = $1
      AND tasks.id = $2
      ORDER BY tasks.id
    `,
      [boardId, taskId]
    ).then(({ rows: tasks }) => {
      res.json(
        tasks.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  // when a board is clicked on, load all associated tasks
  router.get('/:board_id/tasks', (req, res) => {
    
    const boardID = Number(req.params.board_id);

    // console.log("req.params",req.params);
    
    db.query(
      `
      SELECT *
      FROM tasks
      WHERE board_id = $1
      ORDER BY tasks.id

    `,
      [boardID]
    ).then(({ rows: tasks }) => {
      res.json(
        tasks.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  // when any board fields are edited use this endpoint
  router.put('/:board_id', (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => res.status(500).json({}), 1000);
      return;
    }
    // console.log('req.body', req.body);
    const { student, interviewer } = req.body.interview;

    const boardName = req.body.boardName; // use boardName or change here
    const boardDescription = req.body.boardDescription; // use boardDescription or change here
    const boardImage = req.body.boardImage; // use boardImage or change here

    const boardId = req.params.board_id;

    db.query(
      `
      INSERT INTO boards (name, description, image_url)
      VALUES ($1, $2, $3)
      WHERE id = $4

    `,
      [boardName, boardDescription, boardImage, boardId]
    )
      .then(() => {
        setTimeout(() => {
          res.status(204).json({});
          updateBoard(Number(req.params.id), req.body.interview);
        }, 1000);
      })
      .catch(error => console.log(error));
  });

  // when user closes task focus view, or changes content
  router.put('/:board_id/tasks/:task_id', (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => res.status(500).json({}), 1000);
      return;
    }
    // console.log('req.body:', req.body);

    const { board_id, description, due_date, id, title, status } =
      req.body.updatedCard;

    db.query(
      `
      UPDATE tasks
      SET title = $1, description = $2, due_date = $3, board_id = $4, status = $5
      WHERE tasks.id = $6
    `,
      [title, description, due_date, board_id, status, id]
    ).catch(error => console.log(error));
  });

  // button on board focus view to delete board (extra confirm like scheduler?)
  router.delete('/:board_id', (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => res.status(500).json({}), 1000);
      return;
    }

    const boardId = req.params.board_id;

    db.query(`DELETE FROM interviews WHERE appointment_id = $1::integer`, [
      boardId,
    ]).then(() => {
      setTimeout(() => {
        res.status(204).json({});
        updateBoard(Number(req.params.id), null);
      }, 1000);
    });
  });

  // when user clicks "delete" on task focus view
  router.delete('/:board_id/tasks/:task_id', (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => res.status(500).json({}), 1000);
      return;
    }

    const taskId = req.params.task_id;

    db.query(`DELETE FROM tasks WHERE tasks. = $1`, [taskId]).then(() => {
      setTimeout(() => {
        res.status(204).json({});
        updateTask(Number(req.params.id), null);
      }, 1000);
    });
  });

  return router;
};
