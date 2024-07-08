/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const SUPPLIER_BASE_REST_API_URL = 'http://192.168.137.14:3308/api/supplier'

const SUPPLIER_ASSET_BASE_REST_API_URL = 'http://192.168.137.14:3308/api/supplier/asset'

class SupplierService {
    
    // Supplier
    getAllSupplier() {
        return axios.get(SUPPLIER_BASE_REST_API_URL)
    }

    getSupplierById(id) {
        return axios.get(SUPPLIER_BASE_REST_API_URL + '/' + id)
    }

    getAllSupplierAsset() {
        return axios.get(SUPPLIER_ASSET_BASE_REST_API_URL)
    }

    getSupplierAssetById(id) {
        return axios.get(SUPPLIER_ASSET_BASE_REST_API_URL + '/' + id)
    }

    createSupplierAsset() {
        return axios.post(SUPPLIER_BASE_REST_API_URL)
    }

    updateSupplierAsset(supId, supplier) {
        return axios.put(SUPPLIER_ASSET_BASE_REST_API_URL + "/" + supId, supplier)
    }

    deleteSupplierAsset(id) {
        return axios.delete(SUPPLIER_ASSET_BASE_REST_API_URL + '/' + id)
    }


}

export default new SupplierService();