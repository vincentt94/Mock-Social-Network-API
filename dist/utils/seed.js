import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { generateUsers, generateThoughts } from './data.js';
connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');
    //delete the collections if they exist
    try {
        //delete exisiting data if any
        await Thought.deleteMany({});
        await User.deleteMany({});
        //generate random users
        const users = generateUsers(10);
        const createdUsers = await User.insertMany(users);
        //grab usernames from created users
        const usernames = createdUsers.map(user => user.username);
        //generate random thoughts using created usernames
        const thoughts = generateThoughts(10, usernames);
        const createdThoughts = await Thought.insertMany(thoughts);
        for (const thought of createdThoughts) {
            await User.findOneAndUpdate({ username: thought.username }, { $addToSet: { thoughts: thought._id } });
        }
        console.table(createdUsers);
        console.table(createdThoughts);
        console.info('Seeding complete');
    }
    catch (err) {
        console.error('Seeding failed', err);
    }
});
