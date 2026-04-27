const BASE_URL = 'https://notes-api.dicoding.dev/v1/#/';


async function register({name,email,password}) {
    const response = await fetchWithToken(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name,
            email,
            password
        })
    });

}
