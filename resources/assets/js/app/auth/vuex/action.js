import {setHttpToken} from "../../../helpers";
import {isEmpty}  from 'lodash'
import localforage from 'localforage'

export const register = ({dispatch}, {payload, context}) => {
    return axios.post('/api/register', payload).then((response) => {

        dispatch('setToken', response.data.meta.token).then(() => {
            dispatch('fetchUser')
        })
    }).catch((error) => {
        context.errors = error.response.data.errors
    })
}

export const login = ({dispatch}, {payload, context}) => {
    return axios.post('/api/login', payload).then((response) => {

        dispatch('setToken', response.data.meta.token).then(() => {
            dispatch('fetchUser')
        })
    }).catch((error) => {
        context.errors = error.response.data.errors
    })
}

export const logout = ({dispatch}) => {
    return axios.post('/api/logout').then((response) => {
        dispatch('clearAuth')
    })
}


export const fetchUser = ({commit}) => {
    return axios.get('/api/me').then((response) => {
        commit('setAuthenticated', true)
        commit('setUserData', response.data.data)
    })
}

export const setToken = ({commit, dispatch}, token) => {
    if(isEmpty(token)) {

        return dispatch('checkTokenExist').then((token) => {
            setHttpToken(token)
        })
    }

    commit('setToken', token)
    setHttpToken(token)
}

export const checkTokenExist = ({commit, dispatch}, token) => {

    return localforage.getItem('authToken').then((token) => {

        if (isEmpty(token)) {
           return Promise.reject('NO_STORAGE_TOKEN')
        }
        return Promise.resolve(token)
    })
}

export const clearAuth = ({commit}, token) => {
    commit('setAuthenticated', false)
    commit('setUserData', null)
    commit('setToken', null)
    setHttpToken(null)
}