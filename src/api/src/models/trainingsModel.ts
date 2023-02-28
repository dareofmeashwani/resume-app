import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const TrainingSchema = new mongoose.Schema({
    position: {
        type: String,
        maxLength: 100,
        trim: true,
        required: true
    },
    organization: {
        type: String,
        maxLength: 100,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true
    },
    area: {
        type: String,
        maxLength: 100,
        trim: true
    },
    techStack: {
        type: String,
        maxLength: 200,
        trim: true
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
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
TrainingSchema.plugin(mongooseAggregatePaginate);
const Training = mongoose.model('Training', TrainingSchema);
export default Training;
