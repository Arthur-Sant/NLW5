import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionRepository";

interface IConnectionCreate{
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionService {
  private connectionsRepository: Repository<Connection>;

  constructor(){
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({socket_id, user_id, admin_id, id}: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserID(user_id: string) {
    const connection = await this.connectionsRepository.findOne({user_id});

    return connection;
  }

  async findAllWithoutAdmin(){
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"]
    });

    return connections;
  }

  async findBySocketID(socket_id: string) {
    const connections = await this.connectionsRepository.findOne({socket_id});

    return connections;
  }

  async updateAdminId(user_id: string, admin_id: string) {
    await this.connectionsRepository
    .createQueryBuilder()
    .update(Connection)
    .set({ admin_id })
    .where("user_id = :user_id", { user_id }) //:username serve para mostrar que vamos receber um parametro
    .execute();
  }
}

export { ConnectionService }  