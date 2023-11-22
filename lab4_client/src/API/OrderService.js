
export default class OrderService {
    static async getAll(){
        const response = await fetch('http://localhost:5000/api/order'); // Replace with your API endpoint
        return await response.json();
    }
    static async getById(id){
        const response = await fetch('http://localhost:5000/api/order/' + id); // Replace with your API endpoint
        return await response.json();
    }
    static async postItem(client, order, authToken){
        // console.log(authToken);

        // Create a new FormData object
        const formData = new FormData();

        console.log("Client: ", client);

        // Append other properties from the newsletter object
        Object.keys(client).forEach((key) => {
            formData.append(key, client[key]);
            console.log(key, " + ", client[key]);
        });

        // console.log("Formdata1: ", formData);
        console.log("Order: ", order);

        // Append other properties from the newsletter object
        Object.keys(order).forEach((key) => {
            formData.append(key, order[key]);
            console.log(key, " + ", order[key]);

        });

        console.log("Formdata2: ", formData);
        console.log("JSON: ", JSON.stringify({...client,...order}));

        const response = await fetch('http://localhost:5000/api/order', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData, // Convert your data to JSON format
        });
        console.log("Formdata3: ", formData);

    }
    static async postItem2(client, order, authToken){
        // console.log(authToken);

        // Create a new FormData object
        const formData2 = new FormData();

        // Append other properties from the newsletter object
        Object.keys(client).forEach((key) => {
            formData2.append(key, client[key]);
        });
        console.log("Formdata: ", formData2);

        // Append the image file to FormData
        // formData.append('image', imageFile);

        const response = await fetch('http://localhost:5000/api/order', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: formData2, // Convert your data to JSON format
        });
    }
    static async deleteById(id, authToken){

        const response = await fetch('http://localhost:5000/api/order/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authToken}`, // Set the content type based on your API requirements
                // You may include other headers as needed
            },
            // You can include a request body if needed for some APIs, but DELETE requests often don't have a body
            // body: JSON.stringify({}),
        });    }
}