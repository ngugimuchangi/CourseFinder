export async function getAllUsers() {

        try{
            const response = await fetch('127.0.0.1/users');
            return await response.json();
        }catch(error) {
            return [];
        }

}

export async function createUser(data) {
        const response = await fetch(`127.0.0.1/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data})
        })
        return await response.json();
}