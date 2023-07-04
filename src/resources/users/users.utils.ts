import { ServerResponse } from "http";
import { UserType } from "../../db/users";
import * as uuid from 'uuid';

export const validateUser = (user: UserType, res: ServerResponse) => {

    const throwError = (message?: string) => {
        res.writeHead(400);
        res.end(JSON.stringify({ message: message ||  'User is invalid' }));

        return;
    };

    if(!validateId(user.id, res)) {
        return;
    };

    if(!user) {
        return throwError();
    }

    if(!user.age || typeof user.age !== 'number') {
        return throwError('Age is required and should be number');
    }

    if(!user.username || typeof user.username !== 'string') {
        return throwError('username is required and should be string');
    }

    if (!user.hobbies || !Array.isArray(user.hobbies)) {
        return throwError('hobbies is required and should be array');
    }

    return true;
}

export const validateId = (id: string, res: ServerResponse) => {
    if(!uuid.validate(id)) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'User id is invalid' }));

        return;
    }

    return true;
}