import mongoose from 'mongoose';


const categorySchema=new mongoose.Schema({
categoryName:{type:String,required:[false]},
cat_image: {
    type: String,
    contentType: String,
    metadata: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
    }
}
,
subCategory:[
{name:String,
 image:{
    type: String,
    contentType: String,
    metadata: {
        fieldname: String,
        originalname: String,
        encoding: String,
        mimetype: String,
        destination: String,
        filename: String,
        path: String,
        size: Number
    }
}
}]
})

categorySchema.index({ categoryName: 1 }, { unique: true, caseInsensitive: true });

const categoryModel=mongoose.model("Category",categorySchema);

export default categoryModel;
