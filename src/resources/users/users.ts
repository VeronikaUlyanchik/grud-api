import { IncomingMessage, ServerResponse } from "http";
import usersCollection from "./users.service"
import { validateId, validateUser } from "./users.utils";
import { getBody } from "../../utils/getBody";
import * as uuid from 'uuid';

export const userApi = {
    getAllUsers: (res: ServerResponse) => {
        const users = usersCollection.get();

        res.writeHead(200);
        res.end(JSON.stringify(users));
    },
    getUser: (res: ServerResponse, id: string) => {
        if(!validateId(id, res)) {
            return;
        }

        const user = usersCollection.getUser(id);

        if(user) {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'User does not exist'}));
        }
    },
    createUser: async (res: ServerResponse, req: IncomingMessage) => {
        const body = await getBody(req);
        const createdUser = {...body, id: uuid.v1() }
        if(validateUser(createdUser, res)) {
            const users = usersCollection.create(createdUser);

            res.writeHead(200);
            res.end(JSON.stringify(users));
        }
    },
    updateUser: async (res: ServerResponse, req: IncomingMessage, id: string) => {
        const body = await getBody(req);

        const oldUser = usersCollection.getUser(id);

        if(!oldUser) {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'User does not exist'}));
            return;
        }

        const combineUser = {...oldUser, ...body};
        if(validateUser(combineUser, res)) {
            const users = usersCollection.update(id, combineUser);

            res.writeHead(200);
            res.end(JSON.stringify(users));
        }

    },
    deleteUser: async (res: ServerResponse, id: string) => {
        const oldUser = usersCollection.getUser(id);

        if(!oldUser) {
            res.writeHead(404);
            res.end(JSON.stringify({message: 'User does not exist'}));
            return;
        }
            const users = usersCollection.delete(id);

            res.writeHead(204);
            res.end(JSON.stringify([]));

    }


    
}