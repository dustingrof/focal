
const testMe = function () {

  const resultsArray = [[], [], [], []];

  const results = {
    12: {
      id: 12,
      board_id: 1,
      name: "quam sollicitudin vitae consectetuer eget",
      status: 2,
      description: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
      due_date: "2021-06-03T07:00:00.000Z",
      created_at: "2021-07-05T07:00:00.000Z",
      active: true
    },
    16: {},
    20: {}
  };

 

  for (const result in results) {
    if (results[result].status === 1) {
      resultsArray[0].push(results[result]);
    }
    if (results[result].status === 2) {
      resultsArray[1].push(results[result]);
    }
  };
  
};


testMe();

