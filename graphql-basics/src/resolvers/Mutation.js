import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  createUser(parent, args, ctx, info) {
    const { users } = ctx.db;
    const { email } = args.data;
    const emailTaken = users.some((user) => user.email === email);
    if (emailTaken) throw new Error('Email is taken');
    const user = {
      id: uuidv4(),
      ...args.data,
    };
    users.push(user);
    return user;
  },
  deleteUser(parent, args, ctx, info) {
    let { users, posts, comments } = ctx.db;
    const { id } = args;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) throw new Error('User not found');
    const deleted = users.splice(userIndex, 1);

    comments = comments.filter((comment) => comment.author !== id);
    posts = posts.filter((post) => {
      const match = post.author === id;
      if (match) {
        comments = comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });

    return deleted[0];
  },
  createPost(parent, args, ctx, info) {
    const { posts } = ctx.db;
    const { author } = args.data;
    const userExists = users.some((user) => user.id === author);
    if (!userExists) throw new Error('User not found');
    const post = {
      id: uuidv4(),
      published: false,
      ...args.data,
    };
    posts.push(post);
    return post;
  },
  deletePost(parent, args, ctx, info) {
    let { posts, comments } = ctx.db;
    const { id } = args;
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) throw new Error('Post not found');
    const deleted = posts.splice(postIndex, 1);
    comments = comments.filter((comment) => comment.post !== id);
    return deleted[0];
  },
  createComment(parent, args, ctx, info) {
    const { comments } = ctx.db;
    const { author, post } = args.data;
    const userExists = users.some((user) => user.id === author);
    if (!userExists) throw new Error('User not found');
    const postExists = posts.some(
      (currentPost) => currentPost.id === post && currentPost.published,
    );
    if (!postExists) throw new Error('Post not found');
    const comment = {
      id: uuidv4(),
      ...args.data,
    };
    comments.push(comment);
    return comment;
  },
  deleteComment(parent, args, ctx, info) {
    let { comments } = ctx.db;
    const { id } = args;
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) throw new Error('Comment not found');
    const deleted = comments.splice(commentIndex, 1);
    return deleted[0];
  },
};

export default Mutation;
