/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const CUSTOMER_BASE_REST_API_URL = 'http://localhost:8081/api/customer'

class CustomerService {
    
    // customer
    getAllCustomer() {
        return axios.get(CUSTOMER_BASE_REST_API_URL)
    }

    createCustomer(customer) {
        return axios.post(CUSTOMER_BASE_REST_API_URL, customer)
    }

    getCustomerById(customerId) {
        return axios.get(CUSTOMER_BASE_REST_API_URL, customerId)
    }

    updateCustomer(customerId, customer) {
        return axios.put(CUSTOMER_BASE_REST_API_URL + "/" + customerId, customer)
    }

    deleteCustomer(customerId) {
        return axios.delete(CUSTOMER_BASE_REST_API_URL + "/" + customerId)
    }
}

export default new CustomerService();