import db from '../../connection/connection-babel/connection';
import BlogSchema from '../../models/models-babel/Blogs';




/* ============ Start:: Getting all Blogs but with limit ============= */
const getAllBlogs = async (req ,  res) => {
    let limitNumber = req.query.limit != null || req.query.limit != undefined ? req.query.limit : 6 ;

    try {
        const blogsData = await BlogSchema.find({}).limit(limitNumber);
        if(blogsData.length !=  0){
            res.status(200).json(blogsData);
        }
        else{
            res.status(404).json({"message" : 'No blogs found'});
        }
    } catch (error) {
        res.status(500).json({ "message" : 'Server error' });
    }

}
/* ============== End:: Getting all Blogs but -with limit ============= */


/* ============ Start:: Getting spacific Blogs ============= */
const getSpacificBlog = async (req , res) => {
    let blogId = req.params.blogId;
    if(blogId == null || blogId == undefined || blogId.trim() == '') return res.status(400).json({"error" : "Bad request"}) ;
    try {
     
        let query = {_id : blogId};
      
        if(blogId.trim() === '' || blogId.trim() === null){
            res.status(400).json({'error' : "Bad request"});
            return;
        } 

        let data = await BlogSchema.find(query);
        if(data.length != 0){
            res.status(200).json(data);
            return;
        }
        else{
            res.status(404).json({"error" : 'blog not found'});
            return;
        }
    } catch (error) {   
        res.status(500).json({"error" : 'Server error'});        
    }
}
/* ============== End:: Getting spacific Blogs ============= */



/* ============ Start:: Create Blog  ============= */
const createNewblog = async (req , res) => {
    const { Subtitle,Title,dateCreated,info,postBanner,rate } =  req.body;
    try {
        // validations will happen here
        // if(!newBlogData){
        //     res.status(400).json({'message' : "Please make sure you have provided all blogs information"});
        //     return;
        // }  
        const creatorId = req.user._id ;  
        const newBlog = new BlogSchema({
            Subtitle,
            Title,
            creatorId : creatorId ,
            dateCreated,
            info,
            postBanner,
            rate
        });
        const savedBlog = await newBlog.save();
        res.status(200).json({"blogId" : newBlog._id});
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message" : "Server error"});
    }
}
/* ============== End:: Create Blog  ============= */


/* ============ Start:: Create Blog  ============= */
const deleteBlog = async (req , res) => {
    try {
        let blogId = req.body.blogId;
        let query = {_id : blogId};
      
        if(blogId.trim() === '' || blogId.trim() === null){
            res.status(400).json({'message' : "Bad request"});
            return;
        } 

        let data = await BlogSchema.deleteOne(query);
        if(data.deletedCount === 1 ){
            res.status(200).json({"success" : `blog with this id ${blogId} have been deleted`});
            return;
        }
        else{
            res.status(404).json({"message" : 'we don\'t have that blog'});
            return;
        }
    } catch (error) {   
        res.status(500).json({"message" : 'Server error'});        
    }
}
/* ============== End:: Create Blog  ============= */

/* ============ Start:: Create Blog  ============= */
const updateBlog = async (req , res) => {
    try {
        let blogId = req.body.blogId;
        let formData = req.body ;
              
        if(blogId.trim() === '' || blogId.trim() === null){
            res.status(400).json({'message' : "Bad request"});
            return;
        } 

        // if(formData.trim() === '' || formData.trim() === null){
        //     res.status(400).json({'message' : "Provide what to update"});
        //     return;
        // } 

        let query = {_id : blogId};
        let data = await BlogSchema.updateOne({
            query,
            $set:formData
        });
        if(data.matchedCount === 1 ){
            
            if(data.modifiedCount == 1){
                res.status(200).json({"success" : `blog with this id ${blogId} have been updated`});
                return;
            }
            else{
                res.status(200).json({"success" : `Nothing to update on id ${blogId}`});
                return;
            }
            
        }
        else{
            res.status(404).json({"message" : 'we don\'t have that blog'});
            return;

        }
    } catch (error) {   
        res.status(500).json({"message" : 'Server error'});        
    }
}
/* ============== End:: Create Blog  ============= */

export { getAllBlogs , getSpacificBlog ,createNewblog,deleteBlog,updateBlog }