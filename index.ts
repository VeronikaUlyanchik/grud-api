import { initServer } from "./src/server";

const server = initServer();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});