import { Schema, model } from 'mongoose';

let UserSchema: Schema = new Schema ({
    createdAt: Date,
    updatedAt: Date,
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    }
})

export default model('User', UserSchema)