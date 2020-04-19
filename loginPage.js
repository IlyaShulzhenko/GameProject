"use strict";
const form = document.createElement('form');
const label = document.createElement('label');
const input = document.createElement('input');
const submit = document.createElement('button');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userName = document.getElementById("name").value;
    const user = {
        id: Date.now(),
        name: userName
    };

    localStorage.setItem("user", JSON.stringify(user));
    switchToState({pageName: 'Main'});

});

function renderLoginPage() {
    const wrapperForm = document.createElement('div');
    wrapperForm.className = 'wrapperForm d-flex justify-content-center align-items-center';
    form.setAttribute('id', 'loginForm');
    label.setAttribute('for', 'name');
    label.innerText = 'Name';
    input.setAttribute('id', 'name');
    input.required = true;
    submit.setAttribute('type', 'submit');
    submit.innerHTML = 'Войти';

    form.append(label);
    form.append(input);
    form.append(submit);
    wrapperForm.append(form);

    return wrapperForm;
}

