import axios from 'axios';


exports.getTransaction = (cb) => {
    axios.get('/api/get-transactions').then((response) => {
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = {completed: false };
        cb(res);
    });
};


//Need to configure spring Control to map post body to POJO
exports.postTransaction = (transaction, cb) => {
    axios.post(`/api/add-transaction?category=${transaction.category}&amount=${transaction.amount}&note=${transaction.note}`
        ).then((response) => {
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = {completed: false };
        cb(res);
    });
};

//Need to configure spring Control to map post body to POJO
exports.deleteTransaction = (transactionId, cb) => {
    axios.delete(`api/delete-transaction?transactionId=${transactionId}`,
    ).then((response) => {
        cb(response.data);
    })
};