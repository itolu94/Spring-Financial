import axios from 'axios';

//TODO update all api calls to handle bad request (check status code)
exports.getTransaction = (cb) => {
    axios.get('/api/get-transactions').then((response) => {
        cb(response.data);
    }).catch((err) => {
        console.log(err);
        let res  = {completed: false };
        cb(res);
    });
};

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

exports.getStocks = (stock, cb) => {
    axios.get(`/api/get-stocks?stock=${stock}`
    ).then((response) => {
        let data = response.data["Time Series (60min)"];
        let stocks = {};
        let int = 3;
        stocks.labels = [];
        stocks.series = [];
        stocks.completed=true;
        stocks.name= response.data["Meta Data"]["2. Symbol"];
        for (let key in data) {
            if(int-- >= 0){
                stocks.labels[int + 1] = (key.slice(5, 10) + ' ' + key.slice(10 ,-3)) ;
                stocks.series[int + 1] = (parseInt(data[key]["1. open"]));
            } else break;
        }
        cb(stocks)
    }).catch((err) =>{
        console.log(err);
        let res =  {completed: false};
        cb(res);
    })
};


exports.saveStock = (stock, cb) => {
    axios.post('api/save-stock', stock
    ).then((response) => {
        cb(response.data);
    }).catch((err) => {
      // console.log(err);
      let response = {completed: false};
        cb(response);
    });
};