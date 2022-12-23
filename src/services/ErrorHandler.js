export const ErrorHandler = (error) => {
    if (error.response) {
        // Request made and server responded
        console.log(error.response);
        if (error.response.data?.message) {
            if (error.response.data?.message == 'Unauthenticated.') {
                alert(error.response.data.message);
                localStorage.clear();
                window.location.href = '/';
            } else {
                alert(error.response.data.message);
            }
        } else {
            alert(error.response.data);
        }
    } else if (error.request) {
        console.log(error.request);
        // The request was made but no response was received
        alert(error.request);
    } else {
        console.log(error);
        // Something happened in setting up the request that triggered an Error
        alert(error.message);
    }
}