/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const ASSET_BASE_REST_API_URL = 'http://192.168.1.94:3308/api/asset'

class AssetService {
    
    // Asset
    getAllAsset() {
        return axios.get(ASSET_BASE_REST_API_URL)
    }

    createAsset(asset) {
        return axios.post(ASSET_BASE_REST_API_URL, asset)
    }

    getAssetById(assetId) {
        return axios.get(ASSET_BASE_REST_API_URL + '/' + assetId)
    }

    updateAsset(assetId, asset) {
        return axios.put(ASSET_BASE_REST_API_URL + "/" + assetId, asset)
    }

    deleteAsset(assetId) {
        return axios.delete(ASSET_BASE_REST_API_URL + "/" + assetId)
    }

    getAssetsByOffice(office) {
        return axios.get(ASSET_BASE_REST_API_URL + '/filter?office=' + office)
    }
}

export default new AssetService();