const Comment = {
  author(parent, args, ctx, info) {
    const { users } = ctx.db;
    return users.find((user) => user.id === parent.author);
  },
  post(parent, args, ctx, info) {
    const { posts } = ctx.db;
    return posts.find((post) => post.id === parent.post);
  },
};

export default Comment;
