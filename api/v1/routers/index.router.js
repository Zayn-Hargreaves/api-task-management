const taskRouter = require("./task.router")
const usersRouter = require("./users.router")
const authenMiddleware = require("../middleware/authe.middleware")
module.exports = (app) => {
    const version = "/api/v1";

    app.use(
        version + "/tasks",authenMiddleware.requireAuth,
        taskRouter
    );
    app.use(version+"/users",usersRouter)
}