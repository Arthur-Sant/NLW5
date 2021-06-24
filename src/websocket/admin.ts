import { io } from "../http";
import { ConnectionService } from "../services/ConnectionsServices";
import { MessagesService } from "../services/MessagesService";

io.on("connect", async (socket) =>{
  const connectionService = new ConnectionService();
  const messageService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messageService.listByUser(user_id);

    callback(allMessages); // função de retorno
  });

  socket.on("admin_send_message", async (params) => {
    const { user_id, text } = params;

    await messageService.create({
      user_id, 
      text,
      admin_id: socket.id
    }); 

    const { socket_id } = await connectionService.findByUserID(user_id);

    io.to(socket_id).emit("admin_send_to_client", {
      text,
      socket_id: socket.id
    });
  });

  socket.on("admin_user_in_support", async (params) => {
    const { user_id } = params;

    await connectionService.updateAdminId(user_id, socket.id);

    const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
  })
});