
export default class UserService {
    static async login(credentials){
        console.log(JSON.stringify(credentials));
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }); // Replace with your API endpoint
        const data = await response.json();
        console.log(data.error);
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error);
        }

    }
    static async loginGoogle(){
        const response = await fetch('http://localhost:5000/api/users/auth/google'); // Replace with your API endpoint
        console.log(response.json());
        const data = await response.json();
        console.log(data.error);
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error);
        }

    }

}