const Goals = require("../../models/goals.model.js");
const User = require("../../models/user.model.js");
const { ValidationError } = require("../../core/error");
const Joi = require("joi");

const updateGoal = (req, res) => {
  const goalId = req.params.goalId;
  const userId = req.user.id;

  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20),
      points: Joi.number()
        .min(1)
        .max(10000),
      description: Joi.string()
        .min(1)
        .max(500),
      isDone: Joi.boolean()
    })
    .options({
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  const validData = result.value;

  const sendResponse = goal => {
    res.json({
      status: "success",
      ...goal
    });
  };

  const sendError = error => {
    const errMessage =
      error.message || "must handle this error on registration";
    res.json({
      status: "error",
      error: errMessage
    });
  };

  const validDataLength = Object.keys(validData).length;

  if (validDataLength === 0) {
    sendError({ message: "No valid Fields" });
    return;
  }

  Goals.findByIdAndUpdate(goalId, { $set: validData }, { new: true })
    .then(goal => {
      if (!goal) {
        return sendError({ message: "no such goal" });
      }

      if (req.body.isDone) {
        return User.findByIdAndUpdate(
          userId,
          { $inc: { scores: -goal.points } },
          { new: true }
        )
          .then(updatedUser => {
            sendResponse({
              user: { scores: updatedUser.scores },
              message: "Goal completed!!!"
            });
          })
          .catch(err => {
            throw new Error(err);
          });
      }

      return sendResponse(goal.getPublicFields());
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = updateGoal;
