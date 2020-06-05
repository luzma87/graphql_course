const User = {
  posts(parent, args, ctx, info) {
    const { posts } = ctx.db;
    return posts.filter((post) => post.author === parent.id);
  },
  comments(parent, args, ctx, info) {
    const { comments } = ctx.db;
    return comments.filter((comment) => comment.author === parent.id);
  },
};

export default User;
