import { functionsFetch } from "../utils/functionsFetch";

export const getProductsByWhitelabel = async (whitelabelSlug, category) => {
    try {
        const res = await functionsFetch({
            method: 'GET',
            url: `/product/${category}/${whitelabelSlug}`
        })
        return res.data
    } catch (err) {
        alert(err);
        return Promise.reject(err);
    }
}

export const updateWhitelabelBySlug = async (whitelabelSlug, data) => {
    try {
        const res = await functionsFetch({
            method: 'PUT',
            url: `/whitelabel/${whitelabelSlug}`,
            data
        })
        return res.data
    } catch (err) {
        alert(err);
        return Promise.reject(err);
    }
}

export const deleteWhitelabelById = async (id, action) => {
    try {
        const res = await functionsFetch({
            method: 'DELETE',
            url: `/whitelabel/${id}`
        })
        action()
        console.log(res.data)
    } catch (err) {
        alert(err);
        return Promise.reject(err);
    }
}

export const createWhitelabel = async (data) => {
    try {
        const res = await functionsFetch({
            method: 'post',
            url: `/whitelabel/create`,
            data
        })
        return res.data
    } catch (err) {
        alert(err.response.data.message);
        return Promise.reject(err);
    }
}