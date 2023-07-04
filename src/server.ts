import http, { IncomingMessage, ServerResponse } from 'http';
import { userApi } from './resources/users/users';

const base = '/api/users'

export const initServer = () => {

    const server = http.createServer(function (req: IncomingMessage, res: ServerResponse) {  
        if(!req.url?.includes(base)){
            res.statusCode = 500;
            res.end();
            return;
        }

        if(req.url === base) {
            switch (req.method){
                case 'GET': 
                return userApi.getAllUsers(res);

                case 'POST': 
                return userApi.createUser(res, req);

                default:
                res.writeHead(405);
                res.end(JSON.stringify({ message: 'Method not allowed' }));
        }
    }

        if(req.url.includes(`${base}/`)) {
            const query = req.url.split(`${base}/`)[1];
            switch (req.method) {
                case 'GET': 
                return userApi.getUser(res, query);

                case 'PUT': 
                return userApi.updateUser(res, req, query);

                case 'DELETE': 
                return userApi.deleteUser(res, query);

                default:
                res.writeHead(405);
                res.end(JSON.stringify({ message: 'Method not allowed' }));
        }
    }
    res.writeHead(405);
    res.end(JSON.stringify({ message: 'Method not allowed' }));


    });
    
    return server;
}