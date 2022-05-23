insert into boards (id, name, description, image_url, created_at, active) values (1, 'Focal App Project', 'Build a kanban board type app', 'https://github.com/dustingrof/focal/blob/main/client/public/images/idea.jpg?raw=true', '2022-05-12', true);
insert into boards (id, name, description, image_url, created_at, active) values (2, 'Birdwatching App Project', 'Build an app for bird watching', 'https://github.com/dustingrof/focal/blob/main/client/public/images/woodduck.jpg?raw=true', '2022-05-12', true);
insert into boards (id, name, description, image_url, created_at, active) values (3, 'Homebrew App Project', 'Build an app for managing home-brewing', 'https://github.com/dustingrof/focal/blob/main/client/public/images/brewing.jpg?raw=true', '2022-05-12', true);
insert into boards (id, name, description, image_url, created_at, active) values (4, 'Ski Tour App Project', 'Build an app to track ski touring trip reports', 'https://github.com/dustingrof/focal/blob/main/client/public/images/skis.jpg?raw=true', '2022-05-12', true);
ALTER SEQUENCE boards_id_seq RESTART WITH 5;


