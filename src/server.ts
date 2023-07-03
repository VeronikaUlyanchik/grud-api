import http from 'http';

const endpoint = '/api/users'

export const initServer = () => {
    const server = http.createServer(function (req, res) {  
        if(!req.url?.includes(endpoint)){
            res.statusCode = 500;
            res.end();
            return;
        }

        switch (req.method){
            case 'GET': 
            console.log(req.url)
            res.statusCode = 200;
            res.end();
            case 'POST': 
            console.log(req.url)
            res.statusCode = 200;
            res.end();
            case 'DELETE': 
            console.log(req.url)
            res.statusCode = 200;
            res.end();
            case 'PUT': 
            console.log(req.url)
            res.statusCode = 200;
            res.end();
        }

    });
    
    return server;
}