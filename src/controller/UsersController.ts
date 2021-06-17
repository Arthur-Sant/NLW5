import { Request, Response } from "express";
import { UsersServices } from "../services/UsersServices";

class UsersController{
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const usersService = new UsersServices();

    const user = await usersService.create(email);

    return response.json(user);
  }
}

export { UsersController }