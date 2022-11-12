// Requiring Schema and model from mongoose
const { Schema, model } = require('mongoose');
// Requiring bcrypt for password hashing
const bcrypt = require('bcrypt');
const characterSchema = require('./Character');

// new userSchema subclass of class Schema //ask??
const userSchema = new Schema(
    { //creating fields
        username: { //validators for fields
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        adventures: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Adventure',
            },
        ],
        savedCharacters: [characterSchema],
    },
    // set this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash user password
// ask what pre() does??? ask how this function works
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
// ask???
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Creating virtuals here if needed

// Creating new User model using userSchema 
const User = model('User', userSchema);

// Exporting User as an objec
module.exports = User;
