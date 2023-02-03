require('dotenv').config();

let Person = require('./schema/personSchema');

const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'John Doe',
    age: 37,
    favoriteFoods: ['Pizza', 'French Fries']
  });

  person.save(function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, data) {
    if (err) return console.error(err);
    let person = data;
    person.favoriteFoods = [...data.favoriteFoods, foodToAdd];

    person.save(function (err, data) {
      if (err) return console.error(err);

      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, { age: ageToSet }, {new: true}, function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove}, function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  let query = Person.find({favoriteFoods: foodToSearch});
  query.sort({name: 1});
  query.limit(2);
  query.select("name age favoriteFoods");
  query.exec(function (err, data) {
    if (err) return console.error(err);

    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
