import api from './Api';

export const createTransaction = async (transactionData) => {

    const response = await api.post('/transactions/add', transactionData);
    return response.data;
};


export const getAllTransactions = async () => {

    const response = await api.get('/transactions/all');
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
};