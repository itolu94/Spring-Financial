import axios from 'axios';


//TODO remove function
//TODO pass object for error handling
exports.getTransaction = (cb) => {
    axios.get('/api/get-transactions')
        .then((response) => {
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = {completed: false };
        cb(res);
    });
};

exports.getTransactionCategory = (category ,cb) =>  {
    axios.get(`/api/get-transactions/?category=${category}`)
    .then((response) =>{
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = {completed: false };
        cb(res);
    });
}

exports.postTransaction = (transaction, cb) => {
    axios.post(`/api/add-transaction`, transaction, {withCredentials: true}
    ).then((response) => {
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = {completed: false };
        cb(res);
    });
};

exports.deleteTransaction = (transactionId, cb) => {
    axios.delete(`api/delete-transaction?transactionId=${transactionId}`,
    ).then((response) => {
        cb(response.data);
    })
};

exports.updateTransaction = (transaction, cb) => {
    axios.put(`/api/update-transaction`, transaction
    ).then((response) => {
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = {completed: false };
        cb(res);
    });
};