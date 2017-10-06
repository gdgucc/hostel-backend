import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

let  SALT_WORK_FACTOR = 10;

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

UserSchema.pre('save', function(next){
    var user = this;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password, cb) {
    compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export default model('User', UserSchema)