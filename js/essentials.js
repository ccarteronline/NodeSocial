var config = {
    headers: {
        'token': localStorage.getItem('token')
    }
};

function killToken () {
    alert('logout');
    localStorage.removeItem('token');
    window.location = '/login';
};

function checkIfUserIsLoggedIn () {
    if (localStorage.getItem('token')) {
        window.location = '../control-panel';
    }
};
