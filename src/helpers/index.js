// import request from 'request';

const wait = (timeout = 3000) => new Promise((resolve, reject) => setTimeout(() => resolve(true), timeout));

// const fetchData = async (options) => new Promise((resolve, reject) => {
//     request(options, (error, httpRes, data) => {
//         if (error) {
//             return reject({ error, httpRes });
//         }

//         return resolve({ data, httpRes });
//     })
// })

const checkParams = (params, data, event) => {
    for (const key of params) {
        if (!data.hasOwnProperty(key)) {
            console.error(`Missing params(${event}): ${key}`);
            return key;
        }
    }

    return false;
}

const isEmpty = (object) => {
    if (typeof (object) === 'object') {

        if (JSON.stringify(object) === '{}' || JSON.stringify(object) === '[]') {
            return true;
        }
        else if (!object) {
            return true;
        }

        return false;
    }
    else if (typeof (object) === 'string') {

        if (!object.trim()) {
            return true;
        }

        return false;
    }
    else if (typeof (object) === 'undefined') {
        return true;
    }
    else {
        return false;
    }
}

export {
    wait,
    isEmpty,
    // fetchData,
    checkParams,
}