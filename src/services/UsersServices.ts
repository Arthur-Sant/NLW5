import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/UsersRepository"

class UsersServices{
  private usersRepository: Repository<User>;

  constructor(){
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string){
    const usersExist = await this.usersRepository.findOne({email});

    if(usersExist){
      throw new AppError("Users already exists");
    }

    const user = this.usersRepository.create({email});

    await this.usersRepository.save(user);

    return user;
  }
}

export { UsersServices }