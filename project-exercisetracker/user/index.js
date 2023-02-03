const User = require('./models/user');
const Exercise = require('./models/exercise');

const datas = {
    users: [],
    exercises: []
};

function addUser({username}) {
    let user = new User(username);
    let users = datas.users;

    users.push(user);

    return user;
}


function getAllUser() {
    return datas.users.map(user => {
        return {
            username: user._username,
            _id: user._id
        }
    });
}

function getUser(id) {
    return datas.users.filter(user => user._id === id)[0];
}

function addExercise(data) {
    let user = getUser(data._id);
    if (user) {
        let exercise = new Exercise(user, data.description, data.duration, data.date);
        let exercises = datas.exercises;

        exercises.push(exercise);

        return exercise;
    }

    return null;
}

function getExercises(user) {
    return datas.exercises.filter(exercise => exercise._user === user);
}

function getLogUser(data) {
    let user = getUser(data._id);
    if(!user) {
        return null;
    }
    let exercises = getExercises(user);
    let result = {};
    result.username = user._username;
    result.count = exercises.length;
    result._id = user._id;
    if (data.from != null && data.to != null) {
        exercises = exercises.filter(exercise => {
            const exerciseDate = new Date(exercise._date);
            if (exerciseDate >= new Date(data.from) && exerciseDate <= new Date(data.to)) {
                return true;
            }

            return false;
        });
    }

    if (data.limit) {
        exercises = exercises.slice(0, data.limit);
    }

    result.log = exercises
        .map(exercise => {
            return {
                description: exercise._description,
                duration: exercise._duration,
                date: exercise._date
            }
        });

    return result;
}

module.exports = {
    addUser,
    addExercise,
    getLogUser,
    getAllUser
};