import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import validator from 'validator';
import { HTTP_STATUS, ERROR_MESSAGES } from '../utils/constants';
import { throwResumeError } from '../utils/errorHelper';
const QuerySchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 200,
        trim: true,
        required: true,
    },
    subject: {
        type: String,
        required: true,
        maxLength: 200,
        trim: true
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxLength: 200,
        validate(value : string) {
            if (!validator.isEmail(value)) {
                throwResumeError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.INVALID_EMAIL);
            }
        }
    },
    mobile: {
        type: String,
        maxLength: 13,
        required: true,
        validate(value : string) {
            if (!validator.isMobilePhone(value)) {
                throwResumeError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.INVALID_MOBILE);
            }
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
QuerySchema.plugin(mongooseAggregatePaginate);
const Query = mongoose.model('Query', QuerySchema);
export default Query;
