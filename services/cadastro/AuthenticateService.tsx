import api from "./api";

export async function singInClient(userEmail: String, password: String) {
    try {
        const response = await api.post('/cliente', {
            email: userEmail,
            password: password
        });
        console.log('API Response:', response);
        console.log('Data:', response.data);  
        return response.data;
    } catch (err) {
        console.error('Error:', JSON.stringify(err, null, 2));
        return false;
    }
}