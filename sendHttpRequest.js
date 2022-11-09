
//function to sent a http request
const sendHttpRequest = (method, url, data) => {
    //promise to wait for data retrival
    const promise = new Promise((resolve, reject) => {
        //new xml
        const xhr = new XMLHttpRequest();
        //prepare statement
        xhr.open(method, url);
        //set retrived data type to json
        xhr.responseType = 'json';
        //if there is data to be sent, set header to notify it is json
        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        //once data recieved...
        xhr.onload = () => {
            //check response status, if it is not ok(more than status 400)...
            if (xhr.status >= 400){
                //send back error
                reject(xhr.response);
            } else {
                //if ok content, send back response
                resolve(xhr.response);
            };
        };
        //if there was a error with connection etc...
        xhr.onerror = () => {
            //return with error message
            reject('Something went wrong!');
        };
        //send data
        xhr.send(JSON.stringify(data));
    })
    //return promise
    return promise;
}

//function to get data
const getData = () => {
    //send request
    sendHttpRequest('GET', 'https://reqres.in/api/users')
    //wait for response...
    .then(responseData => {
        console.log(responseData);
    });
}

//add test button
const button = document.getElementById('test')
button.addEventListener('click', getData)