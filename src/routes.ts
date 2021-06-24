import { Router } from "express";
import { MessageController } from "./controller/MessageController";
import { SettingsController } from "./controller/SettingsController";
import { UsersController } from "./controller/UsersController";

const settingsController = new SettingsController();
const usersController = new UsersController();
const messageController = new MessageController();

const routes = Router();

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);

routes.get("/pages/client", (request, response) => {
  return response.render("html/client.html");
});

routes.get("/pages/admin", (request, response) => {
  return response.render("html/admin.html");
});

routes.post("/users", usersController.create);

routes.post("/messages", messageController.create)
routes.get("/messages/:id", messageController.showByUser)

export { routes };