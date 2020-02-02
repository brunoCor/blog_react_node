const mongoose = require('mongoose');
const Category = mongoose.model('categories');
const Blogpost = mongoose.model('blogposts');

module.exports = app => {
    app.get('/api/categories', async (req, res) => {
        const categories = await Category.find();
    
        res.send(categories);
      });

    app.get('/api/categories/blogposts', async (req, res) => {

      // const aggregate = [
      //                     {$sort:{category:1, createdOn: -1}},
      //                     { 
      //                       $group: 
      //                         { 
      //                           '_id': "$_category", 
      //                           "blogposts": {
      //                               $push:{_id: '$_id', title:'$title', summary:'$summary', _image: '$_image', content: '$content', createdOn: '$createdOn'},
      //                               }
                                  
      //                           } 
      //                     },
      //                     {
      //                       $project:{blogposts:{$slice:["$blogposts", 3]}}
      //                     },
      //                     {
      //                       $lookup: {
      //                           from: "categories",
      //                           localField: "_id",
      //                           foreignField: "_id",
      //                           as: "category"
      //                       }
      //                     }
      //                   ];

      // let blogPosts = await Blogpost.aggregate(aggregate).exec();
      // blogPosts = blogPosts.map(blogPost => {
      //   blogPost.wording = blogPost.category[0].wording;
      //   delete blogPost.category;
      //   return blogPost;
      // })
      //@todo : optimisation of requests thanks to aggregate

      categories = await Category.find().sort({ '_category': 1 });
      const data = categories.map(async category => {
        const blogposts = await Blogpost.find({_category : category._id}).sort({ 'createdOn': -1 }).populate('_image').limit(3);
        if(blogposts.length > 0)
          return Object.assign(category._doc, {blogposts});
        else
          return null;
      });
      const datas = await Promise.all(data);
      res.send(datas.filter(item => item !== null));
    });

    app.get('/api/categories/:id/blogposts', async (req, res) => {
      const id = req.params.id;
      const pageNo = parseInt(req.query._page);
      const size = parseInt(req.query._size);
      let query = {};
      let totalPage = null;
      if(size && pageNo) {
          query.skip = size * (pageNo - 1);
          query.limit = size;
          totalPage = Math.ceil(await Blogpost.count({_category : id}) / size);
      }
      const blogposts = await Blogpost.find({_category : id}, {}, query).sort({ '_category': 1 }).sort({ 'createdOn': -1 }).populate('_image').populate('_category');

      let response = blogposts;
      if(totalPage !== null) {
        response = {"blogposts": blogposts, "pages":totalPage}
      }
    
      res.status(200).json(response);
    })
}