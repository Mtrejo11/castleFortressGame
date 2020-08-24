export const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const isPasswordValid = (password) => {
    return /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password)
}

export const isUsernameValid = (password) => {
    return /^(?=.*[a-zA-Z]).{5,}$/.test(password)
}