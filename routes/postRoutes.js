const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Post = mongoose.model('posts');

module.exports = app => {
    app.get('/api/posts', async (req, res) => {
      const pageNo = parseInt(req.query._page);
      const size = parseInt(req.query._size);
      const search = req.query._search;
      let query = {};
      let searchQuery = {};
      let totalPage = null;
      let count = null;

      if(search) {
        searchQuery = { "$or": [
          {name: { $regex: search, $options: 'i' } }, 
          {email: { $regex: search, $options: 'i' } },
          {subject: { $regex: search, $options: 'i' } },
          {body: { $regex: search, $options: 'i' } },
      ]}
      }

      if(size && pageNo) {
          query.skip = size * (pageNo - 1);
          query.limit = size;
          totalPage = Math.ceil(await Post.count(searchQuery) / size);
      }
      
      const posts = await Post.find(searchQuery, {}, query).sort({ 'dateSent': -1 });
      let response = posts;
      if(totalPage !== null) {
        response = {"posts": posts, "pages":totalPage}
      }
    
      res.status(200).json(response);
    });

    app.post('/api/posts', async (req, res) => {
        const { email, name, subject, body } = req.body;
    
        const post = new Post({
          name, // filed name will be automaticly title
          email,
          subject,
          body,
          dateSent: Date.now()
        });
    
        await post.save();
        res.send(post);
    });

    app.delete('/api/posts/:id', requireLogin, async (req, res) => {
      const id = req.params.id;
      await Post.findByIdAndRemove(id);
      res.status(200).send();
    })
}