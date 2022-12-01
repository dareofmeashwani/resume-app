import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const EducationSchema = new mongoose.Schema({
    address: {
        type: String,
        maxLength: 200,
        trim: true
    },
    institute: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    programme: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    programmeArea: {
        type: String,
        maxLength: 100,
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
    totalMarks: {
        type: Number,
        required: true
    },
    obtainedMarks: {
        type: Number,
        required: true
    },
    gradingType: {
        type: String,
        enum: [
            "percentage", "cgpa"
        ],
        default: "cgpa"
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
EducationSchema.plugin(mongooseAggregatePaginate);
const Education = mongoose.model('Education', EducationSchema);
export default Education;
