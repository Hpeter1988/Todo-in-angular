const fs = require('fs')
const path = require('path')
const Chance = require('chance')

const chance = new Chance();

const generateTodo = () => ({
  id: chance.integer({ min: 1, max: 10000 }),
  name: chance.sentence({words: 3}),
  isDone: chance.bool()
});

const generateUser = () => ({
  name: chance.name(),
  password: chance.string({ length: 8 }),
  token: chance.string({ length: 6 })
});

const todos = Array.from(new Array(10), ()=> generateTodo());
const user = generateUser();

const mockBackendData = {
  todos,
  user
};

fs.writeFile(
  path.join(__dirname, 'db.json'),
  JSON.stringify(mockBackendData),
  error => error ?
  console.error(`Init db.json failed: ${error}`) :
  console.log('Init db.json was successful!')
);