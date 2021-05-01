export function handleErrors(response) {
    console.log(response)
    if (response.ok) 
        return response.json()
    else throw new Error(response.statusText);
}