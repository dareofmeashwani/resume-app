import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const ExtraCurricularSchema = new mongoose.Schema({
    activity: {
        type: String,
        required: true,
        maxLength: 200,
        trim: true
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true,
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
ExtraCurricularSchema.plugin(mongooseAggregatePaginate);
const ExtraCurricular = mongoose.model('ExtraCurricular', ExtraCurricularSchema);
export default ExtraCurricular;
