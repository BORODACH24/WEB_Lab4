
export default class HotelService {
    static async getAll(){
        const response = await fetch('http://localhost:5000/api/hotel'); // Replace with your API endpoint
        return await response.json();
    }
    static async getById(id){
        const response = await fetch('http://localhost:5000/api/hotel/' + id); // Replace with your API endpoint
        return await response.json();
    }
    static async postItem(hotel, imageFile, authToken){
        // console.log(authToken);

        // Create a new FormData object
        const formData = new FormData();

        // Append other properties from the newsletter object
        Object.keys(hotel).forEach((key) => {
            formData.append(key, hotel[key]);
        });
        console.log("Formdata: ", formData);

        // Append the image file to FormData
        formData.append('image', imageFile);

        const response = await fetch('http://localhost:5000/api/hotel', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData, // Convert your data to JSON format
        });
    }
    static async updateItem(id, hotel, authToken){
        // console.log(authToken);
        console.log("Service: ", hotel)
        // Create a new FormData object
        const formData = new FormData();

        // Append other properties from the newsletter object
        Object.keys(hotel).forEach((key) => {
            formData.append(key, hotel[key]);
        });
        // Append the image file to FormData
        // formData.append('image', imageFile);

        const response = await fetch(`http://localhost:5000/api/hotel/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData, // Convert your data to JSON format
        });
    }
    static async deleteById(id, authToken){

        const response = await fetch('http://localhost:5000/api/hotel/' + id, {
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