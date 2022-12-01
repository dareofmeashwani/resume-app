import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const WorkExperienceSchema = new mongoose.Schema({
    address: {
        type: String,
        maxLength: 200,
        trim: true
    },
    organization: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    position: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    technicalDetail: {
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
});

WorkExperienceSchema.plugin(mongooseAggregatePaginate);
const WorkExperience = mongoose.model('WorkExperience', WorkExperienceSchema);
export default WorkExperience;
