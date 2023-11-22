
export default class ClientService {
    static async getAll(){
        const response = await fetch('http://localhost:5000/api/client'); // Replace with your API endpoint
        return await response.json();
    }
    static async getById(id){
        const response = await fetch('http://localhost:5000/api/client/' + id); // Replace with your API endpoint
        return await response.json();
    }
    static async deleteById(id, authToken){
        const response = await fetch('http://localhost:5000/api/client/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authToken}`, // Set the content type based on your API requirements
                // You may include other headers as needed
            },
            // You can include a request body if needed for some APIs, but DELETE requests often don't have a body
            // body: JSON.stringify({}),
        });    }
    static getImagePath(imagePath){
        return 'http://localhost:5000' + imagePath;
    }
}