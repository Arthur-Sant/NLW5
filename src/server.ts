import { http } from "./http";
import "./websocket/client";

http.listen(3333, () => {
  console.log("rodando em http://localhost:3333/");
}); 