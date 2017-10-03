import { Schema, model } from 'mongoose';

let HostelSchema: Schema = new Schema ({
    createdAt: Date,
    updatedAt: Date,
    name: {
        type: String,
        default: '',
        required: true
    },
    slug: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: '',
        required: true
    },
    room_type: {
        type: String,
        default: '',
        required: true
    },
    location: {
        type: String,
        default: '',
        required: true
    }
})

export default model('Hostel', HostelSchema);
