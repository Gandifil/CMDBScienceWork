export function handleErrors(response) {
    if (response.ok) 
        return response
    else 
        throw new Error(response.statusText)
}