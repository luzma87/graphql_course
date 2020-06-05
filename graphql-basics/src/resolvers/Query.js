const Query = {
  me() {
    return {
      id: 'abc123',
      name: 'Luz',
      email: 'luz@example.com',
      age: 33,
    };
  },
  users(parent, args, ctx, info) {
    const { users } = ctx.db;
    if (!args.query) return users;
    return users.filter((user) =>
      user.name.toLowerCase().includes(args.query.toLowerCase()),
    );
  },
  post(parent, args, ctx, info) {
    const { posts } = ctx.db;
    return posts.find((post) => post.id === args.id);
  },
  posts(parent, args, ctx, info) {
    const { posts } = ctx.db;
    if (!args.query) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase()),
    );
  },
  comments(parent, args, ctx, info) {
    return ctx.db.comments;
  },
};

export default Query;
