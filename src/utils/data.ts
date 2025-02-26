//hard coded list of random ussernames
const usernames = [
'john123',
'mary45',
'darkcow2',
'water3',
'mysteryman',
'name1',
'jerry3',
'flowergirl9',
'durial321',
'b0aty',
];

//array of random thoughts
const thoughtTexts =[
    "I'm hungry ",
    " What time is it ",
    " Nice work ",
    " Good job",
    " Do I know you",
    " I think I've seen you before",
    " Aren't you john123",
    " Where are you from",
    " Interesting ...",
    " What's for dinner",
];

// email domains
const emailDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
];

//function to get a random item from array
const getRandomArrItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

//function to generate a random username 
const getRandomName = (): string => `${getRandomArrItem(usernames)}${Math.floor(Math.random() * 1000)}`;

//function to generate a random email
const getRandomEmail = (): string => `${getRandomName().toLowerCase()}@${getRandomArrItem(emailDomains)}`;


//funcion to generte an array of random users
const generateUsers = (count: number) => {
    return Array.from({length: count}, () => ({
        username: getRandomName(),
        email: getRandomEmail(),
        thoughts: [],
        friends: []
    }));
};

//function to generate random thoughts
const generateThoughts = (count: number, usernames: string[]) => {
    return Array.from({length: count}, () => ({
        thoughtText: getRandomArrItem(thoughtTexts),
        username: getRandomArrItem(usernames)
    }));
};

export {generateUsers, generateThoughts};