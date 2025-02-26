//hard coded list of random ussernames
const usernames = [
    'john',
    'mary',
    'darkcow',
    'water',
    'mysteryman',
    'name',
    'jerry',
    'flowergirl',
    'durial321',
    'b0aty',
    'dingus',
    'bingus',
    'cakeeater'
];
//array of random thoughts
const thoughtTexts = [
    "I'm hungry ",
    " What time is it ",
    " Nice work ",
    " Good job",
    " Do I know you",
    " I think I've seen you before",
    " Aren't you john",
    " Where are you from",
    " Interesting ...",
    " What's for dinner",
    "Have we met before?",
    "What's the move tonight"
];
// email domains
const emailDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
];
//function to get a random item from array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
//function to generate a random username 
const getRandomName = () => `${getRandomArrItem(usernames)}${Math.floor(Math.random() * 1000)}`;
//function to generate an email associated with the username
const getEmail = (username) => `${username.toLowerCase()}@${getRandomArrItem(emailDomains)}`;
//funcion to generte an array of random users
const generateUsers = (count) => {
    return Array.from({ length: count }, () => {
        const username = getRandomName();
        return {
            username,
            email: getEmail(username),
            thoughts: [],
            friends: []
        };
    });
};
//function to generate random thoughts
const generateThoughts = (count, usernames) => {
    return Array.from({ length: count }, () => ({
        thoughtText: getRandomArrItem(thoughtTexts),
        username: getRandomArrItem(usernames)
    }));
};
export { generateUsers, generateThoughts };
