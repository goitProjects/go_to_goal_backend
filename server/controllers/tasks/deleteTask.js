const Tasks = require("../../models/tasks.model.js");
const User = require("../../models/user.model");

const { ValidationError } = require("../../core/error");

const deleteTask = (req, res) => {
  const userId = req.user._id;
  const taskId = req.params.taskId;

  const sendResponse = user => {
    res.json({
      status: "success",
      ...user
    });
  };

  const sendError = error => {
    const errMessage =
      error.message || "must handle this error on registration";
    res.status(400).json({
      status: "error",
      error: errMessage
    });
  };

  Tasks.findByIdAndDelete({ userId, _id: taskId })
    .then(task => {
      if (!task) {
        sendError({ message: "no such task" });
        return;
      }
      if (task.isComplete) {
        return User.findByIdAndUpdate(
          userId,
          {
            $pull: { tasks: taskId },
            $inc: { scores: -task.points }
          },
          { new: true }
        )
          .then(updatedUser => {
            return sendResponse({
              message: "Task successful deleted!",
              user: { scores: updatedUser.scores }
            });
          })
          .catch(err => {
            throw new ValidationError(err.message);
          });
      } else {
        return User.findByIdAndUpdate(
          userId,
          { $pull: { tasks: taskId } },
          { new: true }
        )
          .then(sendResponse)
          .catch(err => {
            throw new ValidationError(err.message);
          });
      }
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = deleteTask;
