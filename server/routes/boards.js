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
    const boardName = req.body.boardToAdd.name; // use boardName or change here
    const boardDescription = req.body.boardToAdd.description; // use boardDescription or change here
    const boardImage = req.body.boardToAdd.image_url; // use boardImage or change here

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

    const title = req.body.newCard.title;
    const description = req.body.newCard.description;
    const due_date = req.body.newCard.due_date;
    const board_id = Number(req.params.board_id); // this comes from address
    // const board_id = req.params.board_id; // this comes from address
    const status = req.body.newCard.status;
    const array_of_users = req.body.newCard.array_of_users

    db.query(
      `
      INSERT INTO tasks (title, description, due_date, board_id, status, array_of_users)
      VALUES ($1, $2, $3, $4, $5, $6)

    `,
      [title, description, due_date, board_id, status, array_of_users]
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

    // console.log('req.params', req.params);

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

    const boardName = req.body.boardDataToUpdate.name; // use boardName or change here
    const boardDescription = req.body.boardDataToUpdate.description; // use boardDescription or change here
    const boardImageUrl = req.body.boardDataToUpdate.image_url;

    const boardId = req.body.boardDataToUpdate.id;


    db.query(
      `
      UPDATE boards
      SET name = $1, description = $2, image_url = $3
      WHERE boards.id = $4

    `,
      [boardName, boardDescription, boardImageUrl, boardId]
    )
      // .then(() => {
      // setTimeout(() => {
      //   res.status(204).json({});
      //   updateBoard(Number(req.params.id), req.body.interview);
      // }, 1000);
      // })
      .catch(error => console.log(error));
    res.send('');
  });

  // when user closes task focus view, or changes content
  router.put('/:board_id/tasks/:task_id', (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => res.status(500).json({}), 1000);
      return;
    }

    const {
      description,
      due_date,
      id,
      title,
      status,
      total_time_sec,
      board_id,
      array_of_users,
    } = req.body.updatedCard;

    db.query(
      `
      UPDATE tasks
      SET title = $1, description = $2, due_date = $3, board_id = $4, status = $5, total_time_sec = $7, array_of_users = $8
      WHERE tasks.id = $6
    `,
      [
        title,
        description,
        due_date,
        board_id,
        status,
        id,
        total_time_sec,
        array_of_users,
      ]
    ).catch(error => console.log(error));
    res.send(''); //needed this because our .then in board provider wasn't firing
  });

  // button on board focus view to delete board (extra confirm like scheduler?)
  router.delete('/:board_id', (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => res.status(500).json({}), 1000);
      return;
    }

    const boardId = req.params.board_id;

    db.query(`DELETE FROM boards WHERE id = $1`, [boardId]).then(() => {
      res.status(204).json({});
      // setTimeout(() => {
      //   res.status(204).json({});
      //   updateBoard(Number(req.params.id), null);
      // }, 1000);
    });
  });

  // when user clicks "delete" on task focus view
  router.delete('/:board_id/tasks/:task_id', (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => res.status(500).json({}), 1000);
      return;
    }

    const taskId = req.params.task_id;

    db.query(`DELETE FROM tasks WHERE id = $1`, [taskId])
      .then(() => {
        res.status(204).json({});
        // setTimeout(() => {
        //   // updateTask(Number(req.params.id), null);
        // }, 1000);
      });
  });

  return router;
};
