const Chance = require('chance')

const {
  todos = [],
  user = {}
} = require('./db.json')

const todosPath = '/todos';
const userPath = '/user'

module.exports = (req, res, next) => {
  if(req.method.toUpperCase() === 'POST'){
   const id = chance.integer({ min: 1, max: 10000 })
   
   const { body } = req || {};

   req.body = { ...body, id }
  }
}