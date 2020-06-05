let users = [
  { id: '1', name: 'luz', email: 'luz@example.com' },
  { id: '2', name: 'pepe', email: 'pepe@example.com', age: 39 },
  { id: '3', name: 'mike', email: 'mike@example.com' },
];

let posts = [
  { id: '1', title: 'title 1', body: 'body 1', published: true, author: '3' },
  { id: '2', title: 'title 2', body: 'body 2', published: false, author: '1' },
  { id: '3', title: 'title 3', body: 'body 3', published: true, author: '1' },
];

let comments = [
  { id: '1', text: 'comment 1 post 1', author: '1', post: '1' },
  { id: '2', text: 'comment 2 post 1', author: '2', post: '1' },
  { id: '3', text: 'comment 1 post 2', author: '1', post: '2' },
  { id: '4', text: 'comment 1 post 3', author: '3', post: '3' },
];

const db = {
  users,
  posts,
  comments,
};

export default db;
