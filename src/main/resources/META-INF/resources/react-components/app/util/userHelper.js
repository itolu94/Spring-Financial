import axios from 'axios';


exports.createAccount = (userInformation, cb) => {
    axios.post('api/add-person', userInformation
    ).then((response) => {
        cb(response.data);
    });
};

exports.login = (userInformation, cb) => {
    axios.post('api/login', userInformation
    ).then((response) => {
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = err.response.data;
        cb(res);
    })
};



exports.getUserInformation = (cb) =>  {
    axios.get('/api/get-user-information').then((response) => {
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = {completed: false };
        cb(res);
    });
};
