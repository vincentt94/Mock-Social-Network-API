import { Schema, model, Document, ObjectId, Types } from 'mongoose';

//Interface for Thought
interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: ObjectId[] | [],
}

// Reaction Schema

const reactionSchema = new Schema({
    //not sure how to set the default value as new ObjectId, does improting Types work??
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    //is timestamp:Date gonna create an issue? 
    createdAt: { type: Date, default: Date.now, get: (timestamp: Date) => new Date(timestamp).toISOString() }
})

//Thought Schema

const thoughtsSchema = new Schema<IThought>({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now, get: (timestamp: Date) => new Date(timestamp.toISOString()) },
    username: { type: String, required: true },
    reactions: {type: [reactionSchema], default: []},
},
    {
        toJSON: { virtuals: true },
        id: false
    });

//virtual property 'reactionCount' to count the length of the thought's reactions
thoughtsSchema
    .virtual('reactionCount')
    .get(function () {
        return Array.isArray(this.reactions)? this.reactions.length: 0;
    });

const Thought = model('Thought', thoughtsSchema);

export default Thought;