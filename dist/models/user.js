import { Schema, model } from 'mongoose';
;
//schema to create User model
const userSchema = new Schema({
    username: { type: String, unique: true, required: true, trimmed: true },
    email: { type: String, unique: true, required: true, trimmed: true },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
    toJSON: { virtuals: true },
    id: false
});
//virtual property 'friendCount' that gets the count of friends of the users friends array
userSchema
    .virtual('friendCount')
    .get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
