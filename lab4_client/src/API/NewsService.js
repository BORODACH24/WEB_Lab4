
export default class NewsService {
    static async getAll(){
        const response = await fetch('http://localhost:5000/api/news'); // Replace with your API endpoint
        return await response.json();
    }
    static async getById(id){
        const response = await fetch('http://localhost:5000/api/news/' + id); // Replace with your API endpoint
        return await response.json();
    }
    static async postItem(newsletter, imageFile, authToken){
        // console.log(authToken);

        // Create a new FormData object
        const formData = new FormData();

        // Append other properties from the newsletter object
        Object.keys(newsletter).forEach((key) => {
            formData.append(key, newsletter[key]);
        });
        // Append the image file to FormData
        formData.append('image', imageFile);

        const response = await fetch('http://localhost:5000/api/news', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData, // Convert your data to JSON format
        });
    }
    static async updateItem(id, newsletter, imageFile, authToken){
        // console.log(authToken);
        console.log("Service: ", newsletter)
        // Create a new FormData object
        const formData = new FormData();

        // Append other properties from the newsletter object
        Object.keys(newsletter).forEach((key) => {
            formData.append(key, newsletter[key]);
        });
        // Append the image file to FormData
        // formData.append('image', imageFile);

        const response = await fetch(`http://localhost:5000/api/news/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData, // Convert your data to JSON format
        });
    }
    static async deleteById(id, authToken){
        const response = await fetch('http://localhost:5000/api/news/' + id, {
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