import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true,
        required: true
    },
    experience: {
        type: String,
        maxLength: 50,
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
SkillSchema.plugin(mongooseAggregatePaginate);
const Skill = mongoose.model('Skill', SkillSchema);
export default Skill;
