import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { AppError } from "../errors/AppError";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate{
  chat: boolean;
  username: string;
}

class SettingsService{
  private settingsRepository: Repository<Setting>;

  constructor(){
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  async create({chat, username}: ISettingsCreate){
  const userAlreadyExists = await this.settingsRepository.findOne({username});

  if(userAlreadyExists){
    throw new AppError("User already exists");
  }

  const settings = this.settingsRepository.create({
      chat, 
      username
  });
  
  await this.settingsRepository.save(settings);

  return settings;
 }

 async findByUsername(username: string) {
   const settings = await this.settingsRepository.findOne({username});

   return settings;
 }

 async update(username: string, chat: boolean) {
   await this.settingsRepository
   .createQueryBuilder()
   .update(Setting)
   .set({chat})
   .where("username = :username", { username }) //:username serve para mostrar que vamos receber um parametro
   .execute();
 }
}

export { SettingsService };