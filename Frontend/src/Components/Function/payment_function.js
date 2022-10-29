import axios from "axios"

const topup = async (id,currency) => {
    let response;
    await axios.put(process.env.REACT_APP_HOST + `api/payment/topup/${id}`, {currency})
    .then(res => {
        response = {
            status : res.status,
            message : res.data.message
        }
    })
    .catch(err => {
        response = {
            status : err.response.status,
            message : err.response.data.message
        }
    })
    return response;
}

const withdraw = async (id,currency) => {
    let response;
    await axios.put(process.env.REACT_APP_HOST + `api/payment/withdraw/${id}`, {currency})
    .then(res => {
        response = {
            status : res.status,
            message : res.data.message
        }
    })
    .catch(err => {
        response = {
            status : err.response.status,
            message : err.response.data.message
        }
    })
    return response;
}

const transfer = async (sender_id,receiver_id,currency) => {
    let response;
    await axios.put(process.env.REACT_APP_HOST + `api/payment/transfer/`, {currency,sender_id,receiver_id})
    .then(res => {
        response = {
            status : res.status,
            message : res.data.message
        }
    })
    .catch(err => {
        response = {
            status : err.response.status,
            message : err.response.data.message
        }
    })
    return response;
}

export { topup, withdraw, transfer }