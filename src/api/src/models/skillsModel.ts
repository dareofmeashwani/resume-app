import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    group: {
        type: String,
        maxLength: 50,
        trim: true,
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
