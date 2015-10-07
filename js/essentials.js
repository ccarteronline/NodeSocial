var config = {
    headers: {
        'token': localStorage.getItem('token')
    }
};
function displayAuthUserNav () {
    if (localStorage.getItem('token')) {
        return true;
    }
    return false;
};

function killToken () {
    localStorage.removeItem('token');
    window.location = '/';
};

function checkIfUserIsLoggedIn () {
    if (localStorage.getItem('token')) {
        window.location = '../control-panel';
        isLoggedIn = true;
    }
};

function storeToken (token) {
    localStorage.setItem('token', token);
};
