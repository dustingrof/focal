insert into tasks (id, board_id, title, description, due_date, created_at, active, status, total_time_sec, array_of_users)
values (2, 1, 'Entity relationship diagram', '', '2022-05-14', '2021-12-26', true, 4, 0, 'Dustin, Nicole, Iaan');
insert into tasks (id, board_id, title, description, due_date, created_at, active, status, total_time_sec, array_of_users)
values (3, 1, 'Draw wireframes', '', '2022-05-15', '2021-12-26', true, 4, 0, 'Dustin, Nicole, Iaan');
insert into tasks (id, board_id, title, description, due_date, created_at, active, status, total_time_sec, array_of_users)
values (4, 1, 'Build backend routes', '', '2022-05-19', '2021-12-26', true, 4, 0, 'Dustin, Nicole, Iaan');
insert into tasks (id, board_id, title, description, due_date, created_at, active, status, total_time_sec, array_of_users)
values (5, 1, 'Add modal views', '', '2022-05-17', '2021-12-26', true, 2, 0, 'Dustin, Nicole, Iaan');
insert into tasks (id, board_id, title, description, due_date, created_at, active, status, total_time_sec, array_of_users)
values (6, 1, 'Adjust styling', '', '2022-05-25', '2021-12-26', true, 2, 0, 'Dustin, Nicole, Iaan');
insert into tasks (id, board_id, title, description, due_date, created_at, active, status, total_time_sec, array_of_users)
values (7, 1, 'Demo day presentation', '', '2022-05-26', '2021-12-26', true, 1, 0, 'Dustin, Nicole, Iaan');
ALTER SEQUENCE tasks_id_seq RESTART WITH 8;
