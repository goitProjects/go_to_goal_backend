const cron = require('node-cron');
const updateTasksToDoneList = require('../middleware/updateTasksToDoneList');

cron.schedule('56 59 23 * * * *', () => {
  updateTasksToDoneList();
})