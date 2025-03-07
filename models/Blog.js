import mongoose from "mongoose";

const {Schema, models,model} =  mongoose;

const blogSchema = new Schema({
    title: { type: String  },
    slug: { type: String, required: true },
    images:[ { type: String }],
    blogCategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

},{timestamps: true});

export const Blog=models.Blog || model('Blog',blogSchema,'blogs');