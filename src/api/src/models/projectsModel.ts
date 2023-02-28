import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    area: {
        type: String,
        maxLength: 100,
        trim: true
    },
    guidedBy: {
        type: String,
        maxLength: 200,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500,
        trim: true
    },
    techStack: {
        type: String,
        maxLength: 200,
        trim: true
    },
    status: {
        type: String,
        enum: [
            "public", "draft"
        ],
        default: "public"
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
});
ProjectSchema.plugin(mongooseAggregatePaginate);
const Project = mongoose.model('Project', ProjectSchema);
export default Project;
