const mongoose = require('mongoose');
const path = require("path");
const requireLogin = require('../middlewares/requireLogin');
const Blogpost = mongoose.model('blogposts');
const Image = mongoose.model('images');
const multer = require('multer'); // upload file
const crypto = require('crypto'); // generate file name
const  fs = require('fs');

module.exports = app => {
    
    app.get('/api/blogposts', (req, res) => {
        // to see if req.user exists right after registration or login
        Blogpost.find()
            .limit(parseInt(req.query.limit)) // si undefined, retourne tous les resultats
            .sort({ 'createdOn': -1 })
            .populate('_category')
            .populate('_image')
            .exec()
            .then(blogPosts => res.status(200).json(blogPosts))
            .catch(err => res.status(500).json({
                message: 'blog posts not found - :(',
                error: err
            }));
    });
    
    app.get('/api/blogposts/:id', (req, res) => {
        const id = req.params.id;
        Blogpost.findById(id)
            .populate('_category')
            .populate('_image')
            .then(blogPost => res.status(200).json(blogPost))
            .catch(err => res.status(500).json({
                message: `blog post with id ${id} not found`,
                error: err
            }));
    });

    app.delete('/api/blogposts/:id', requireLogin, async (req, res) => {
        const id = req.params.id;
        const blogPost = await Blogpost.findById(id).populate('_image');
        // const blogPost = await Blogpost.findByIdAndDelete(id);
        if(fs.existsSync(path.join(__dirname, `../uploads/${blogPost._image.filename}`)))
            fs.unlinkSync(path.join(__dirname, `../uploads/${blogPost._image.filename}`));
        await blogPost.remove();
        res.status(200).send();
    });
    
    // app.delete('/blog-posts/:id', (req, res) => {
    //     // return res.status(500).json({ msg: `TESTING ERROR HANDLING on ${req.params.id} delete`});
    //     // console.log('req.isAuthenticated()', req.isAuthenticated());
    //     if(!req.isAuthenticated()) {
    //         return res.status(401).json({ result: 'KO', msg: 'NOT authorized to delete a blog post' });
    //     }
    //     // console.log('router.delete / req.user >>>', req.user);
    //     const id = req.params.id;
    //     console.log('delete by id', id);
    //     Blogpost.findByIdAndDelete(id, (err, blogPost) => {
    //         if (err) {
    //             return res.status(500).json(err);
    //         }
    //         res.status(202).json({ msg: `blog post with id ${blogPost._id} deleted`});
    //     });
    // });
    
    // app.delete('/blog-posts', (req, res) => {
    //     // retrieves the query parameter: http://localhost:3000/api/v1/blog-posts?ids=5c1133b8225e420884687048,5c1133b6225e420884687047
    //     const ids = req.query.ids;
    //     console.log('query allIds', ids);
    //     const allIds = ids.split(',').map(id => {
    //         // casting as a mongoose ObjectId	
    //         if (id.match(/^[0-9a-fA-F]{24}$/)) {
    //             return mongoose.Types.ObjectId((id));		 
    //         }else {
    //             console.log('id is not valid', id);
    //             return -1;
    //         }
    //     });
    //     const condition = { _id: { $in: allIds} };
    //     Blogpost.deleteMany(condition, (err, result) => {
    //         if (err) {
    //             return res.status(500).json(err);
    //         }
    //         res.status(202).json(result);
    //     });
    // });
    
    // let lastUploadedImageName = '';
    // file upload configuration
    const storage = multer.diskStorage({
        destination: './uploads/',
        filename: function (req, file, callback) {
            crypto.pseudoRandomBytes(16, function(err, raw) {
                if (err) return callback(err);
                lastUploadedImageName =  raw.toString('hex') + path.extname(file.originalname);
                callback(null, lastUploadedImageName);
            });
        }
    });
    
    var upload = multer({storage: storage});
    

    app.post("/api/upload", requireLogin,
        upload.single("myImage"), async (req, res) => {
            const image = new Image({path: '/api/images/' + req.file.filename, filename: req.file.filename});
            await image.save();
            res.status(200).send(image); //, file: req.file
        }
     );

    // file upload route
    // upload.single('image') : middlaware qui gère l'upload du fichier (n'est appelé que sur cette route) 
    // app.post('/api/blogposts/images', upload.single('myImage'), (req, res) => {
        // console.log('req.file', req.file);
        // console.log(req.file);
        // if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        //     return res.status(400).json({ msg: 'only image files please'});
        // }
        // res.status(201).send({ fileName: req.file.filename, file: req.file });
    // });
    
    
    app.get('/api/images/:image', (req, res) => {
        const image = req.params.image;
        res.sendFile(path.join(__dirname, `../uploads/${image}`));
    });

    app.delete('/api/images/:id', requireLogin, async (req, res) => {
        const id = req.params.id;
        const image = await Image.findById(id);
        if(fs.existsSync(path.join(__dirname, `../uploads/${image.filename}`)))
            fs.unlinkSync(path.join(__dirname, `../uploads/${image.filename}`));
        let blogPosts = await Blogpost.find({_image: image._id});
        if(blogPosts){
            blogPosts.forEach(blogpost => {
                blogpost._image=null;
                blogpost.save();
            });
        }
       

        await image.delete();
        res.status(200).send();
    })
    
    app.post('/api/blogposts', requireLogin, (req, res) => {
        const blogPost = new Blogpost({
            ...req.body
        });
        blogPost.save((err, blogPost) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(201).json(blogPost);
        });
    });
    
    app.put('/api/blogposts/:id', requireLogin, (req, res) => {
        const id = req.params.id;
        const conditions = { _id: id};
        const blogPost = {...req.body};
        const update = { $set: blogPost };
        const options = {
            upsert: true, // if doesn't exist, create the object
            new: true // return object after modification
        };
        Blogpost.findOneAndUpdate(conditions, update, options, (err, response) => {
            if(err) return res.status(500).json({ msg: 'update failed', error: err });
            res.status(200).json({ msg: `document with id ${id} updated`, response: response });
        });
    });
}