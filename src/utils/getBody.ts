import { IncomingMessage } from "http";
import { UserType } from "../db/users";

function getReqData(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

export const getBody = async (req: IncomingMessage) => {
    const body = await getReqData(req);
    
    return JSON.parse(body);
}