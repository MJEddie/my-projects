const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.add('success');
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min && input.value.trim() !== '') {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Check passwords match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

// Validate real time
function validate(e) {
    const target = e.target;
    switch (target.id) {
        case 'username':
            const userRegex = /^[a-zA-Z0-9]{3,15}$/;
            if (userRegex.test(target.value.trim())) {
                target.parentElement.classList.add('success');
                target.parentElement.classList.remove('error');
            } else {
                target.parentElement.classList.add('error');
                target.parentElement.classList.remove('success');
                showError(target, 'must be at least 3 characters');
            }
            break;
        case 'email':
            if (target.id == "email") {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (emailRegex.test(target.value.trim())) {
                    target.parentElement.classList.add('success');
                    target.parentElement.classList.remove('error');
                } else {
                    target.parentElement.classList.add('error');
                    target.parentElement.classList.remove('success');
                    showError(target, 'Email is not valid');
                }
            }
            break;
        case 'password':
            const pwdRegex = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
            if (pwdRegex.test(target.value.trim())) {
                target.parentElement.classList.add('success');
                target.parentElement.classList.remove('error');
            } else {
                target.parentElement.classList.add('error');
                target.parentElement.classList.remove('success');
                showError(target, 'must be at least 8 characters');
            }
            break;
        case 'password2':
            const pwd2Regex = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
            const pwd = document.querySelector('#password');
            const pwd2 = document.querySelector('#password2');
            if (pwd.value === pwd2.value) {
                target.parentElement.classList.add('success');
                target.parentElement.classList.remove('error');
            } else {
                target.parentElement.classList.add('error');
                target.parentElement.classList.remove('success');
                showError(target, 'Passwords do not match');
            }
            break;

    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Eventlistener
form.addEventListener('input', validate);

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!checkRequired([username, email, password, password2])) {
        checkLength(username, 3, 15);
        checkLength(password, 8, 16);
        checkEmail(email);
        checkPasswordMatch(password, password2);
    }

})