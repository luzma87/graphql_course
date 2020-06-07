const Subscription = {
  comment: {
    subscribe(parent, args, ctx, info) {
      const { db, pubSub } = ctx;
      const { postId } = args;
      const { posts } = db;
      const post = posts.find((post) => post.id === postId && post.published);
      if (!post) throw new Error('post not found');
      return pubSub.asyncIterator(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, ctx, info) {
      const { pubSub } = ctx;
      // todo: add updatePost
      // if published:true => published:false -> trigger deleted
      // if published:false => published:true -> trigger created
      // else trigger updated
      return pubSub.asyncIterator('post');
    },
  },
};

export default Subscription;
