const createTask = require("./createTask");
const deleteTask = require("./deleteTask");
const getAllUserTasks = require("./getAllUserTasks");
const getTaskById = require("./getTaskById");
const updateTask = require("./updateTask");
const toggleTask = require('./toggleTask');

module.exports = {
  createTask,
  deleteTask,
  getAllUserTasks,
  getTaskById,
  updateTask,
  toggleTask
};
