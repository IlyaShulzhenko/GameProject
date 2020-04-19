"use strict";

window.onhashchange = switchToStateFromURLHash;

let SPAState = {};

function switchToStateFromURLHash() {
    let URLHash = window.location.hash;

    let stateJSON = decodeURIComponent(URLHash.substr(1));

    if (stateJSON !== "") {
        SPAState = JSON.parse(stateJSON);
    } else {
        SPAState = { pageName: 'Login' };
    }

    const user = localStorage.getItem('user');
    const pageName = SPAState.pageName;

    const app = document.getElementById('root');
    let pageHTML = "";
    let component;

    if (user) {
        switch (SPAState.pageName) {
            case 'Login':
                component = renderLoginPage();
                break;
            case 'Main':
                component = renderMainPage();
                break;
            case 'Record':
                component = renderRecordsPage();
                break;
            case 'Game':
                pageHTML += '<div id="wrapper" class="wrapper"><canvas class="canvas" id="canvas"></canvas></div>';
                break;
        }
    } else {
        switchToState({pageName: 'Login'});
        component = renderLoginPage();
    }

    while (app.firstChild) {
        app.removeChild(app.firstChild);
    }
    if (pageHTML) {
        app.innerHTML = pageHTML;
    }

    if (component) {
        app.append(component);
    }

    if (pageName === 'Game') {
        startGame();
    }
}

function switchToState(newState) {
    location.hash = encodeURIComponent(JSON.stringify(newState));
}

function switchToMainPage() {
    switchToState({pageName: 'Main'});
}

function switchToRecordPage() {
    switchToState({pageName: 'Record'});
}

function switchToAboutPage() {
    switchToState({pageName: 'About'});
}


// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();
