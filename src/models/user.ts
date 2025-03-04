import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts?: Types.ObjectId[],
    friends?: Types.ObjectId[],
};

//schema to create User model

const userSchema = new Schema<IUser>(
    {
        username: { type: String, unique: true, required: true, trimmed: true },
        email: { type: String, unique: true, required: true, trimmed: true },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        toJSON: { virtuals: true },
        id: false
    });

//virtual property 'friendCount' that gets the count of friends of the users friends array

userSchema
.virtual('friendCount')
.get(function(this: any) {
    return this.friends.length;
});

const User = model('User', userSchema);

export default User;
