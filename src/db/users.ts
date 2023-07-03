let usersMock: UserType[] = [];

type UserType = {
    id: string,
    username: string,
    age: number,
    hobbies: string[],
}


class USERS_COLLECTION {
    public get = () => {
        return usersMock;
    } 

    public create = (data: UserType) => {
        usersMock.push(data);
        return usersMock;
    }

    public getUser(id: string) {
       return usersMock.find((u)=> u.id === id);
    }

    public update(id: string, data: UserType) {
        const user = usersMock.find((u)=> u.id === id);

        if(!user) {
            this.create(data)
        }

        usersMock = usersMock.map((u)=> u.id === id ? data : u);

        return data;
     }

     public delete(id: string) {
        usersMock = usersMock.filter((u)=> u.id !== id);

        return usersMock;
     }
}


const createService = () => new USERS_COLLECTION();

export { createService, UserType };