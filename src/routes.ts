import { Router } from "express";
import { SettingsController } from "./controller/SettingsController";

const settingsController = new SettingsController();

const routes = Router();

routes.post('/settings', settingsController.create);

export { routes };