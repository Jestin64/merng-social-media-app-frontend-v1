import React, { createContext, useReducer } from "react"
import jwt_decode from "jwt-decode"

const initialState = {
    user: null
}

if (localStorage.getItem('jwt-token')) {
    const decodedToken = jwt_decode(localStorage.getItem('jwt-token'))
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt-token')
    } else {
        initialState.user = decodedToken
    }
}


const AuthContext = createContext({
    user: null,
    login: (UserData) => { },
    logout: () => { }
})

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const login = (userData) => {
        localStorage.setItem('jwt-token', userData.token)
            dispatch({
                type: 'LOGIN',
                payload: userData
            })
    }
    const logout = () => {
        localStorage.removeItem('jwt-token')
        dispatch({
            type: 'LOGIN'
        })
    }

    return (
        <AuthContext.Provider value={{ login, logout, user: state.user }} {...props}>
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
