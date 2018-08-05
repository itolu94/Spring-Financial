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
        let res  = {completed: false };
        cb(res);
    })
};

exports.getStocks = (stock, cb) => {
    axios.get(`/api/get-stocks?stock=${stock}`
    ).then((response) => {
        //TODO refine function
        let data = response.data["Time Series (60min)"];
        let stocks = {};
        let resp = {};
        let tmp = {};
        stocks.labels = [];
        stocks.series = [];
        tmp.data = [];
        resp.completed=true;
        let int = 0;
        for (let key in data) {
            if(int++ <= 8){
                stocks.labels.push(key.slice(5, 10) + '\n' + key.slice(10 ,-3)) ;
                stocks.series.push(parseInt(data[key]["1. open"]));
            } else break;
        }
        stocks.label = stocks.labels.reverse();
        stocks.series= stocks.series.reverse();
        stocks.name= response.data["Meta Data"]["2. Symbol"];
        resp.data = stocks;
        cb(resp)
    }).catch((err) =>{
        console.log(err);
        let res =  {completed: false}
        cb(res);
    })
}


exports.saveStock = (stock, cb) => {
    axios.post('api/save-stock', stock
    ).then((response) => {
        // console.log(response);
        cb(response.data);
    }).catch((err) => {
      // console.log(err);
      let response = {completed: false};
        cb(response);
    });
}