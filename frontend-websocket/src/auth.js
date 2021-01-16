const tokenConfig = () => {
    // Getting the token from session storage.
    let token = sessionStorage.getItem('token')

    var config = {
        headers: {
            "content-type": "application/json"
        }
    }
    if (token) {
        config.headers['auth-token'] = token
    }
    return config
}
module.exports = tokenConfig;