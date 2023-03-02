import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const TokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt:{
        type: Date,
        default: Date.now
    }
});
TokenSchema.plugin(mongooseAggregatePaginate);
const Token = mongoose.model('Token', TokenSchema);
export default Token;
