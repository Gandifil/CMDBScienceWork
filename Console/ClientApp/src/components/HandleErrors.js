export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response);
    }
    return response.json();
}