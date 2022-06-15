import trottle from 'lodash.throttle';

const form = document.querySelector(".feedback-form")
const formInput = document.querySelector(".feedback-form input");
const formTextarea = document.querySelector(".feedback-form textarea");

let formData = {};
const LOCAL_STORAGE_KEY = "feedback-form-state";

ifLocalStorageNotEmpty();


function ifLocalStorageNotEmpty() {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        const savedMessage = localStorage.getItem(LOCAL_STORAGE_KEY);
        const formValues = JSON.parse(savedMessage);
        formData = formValues;
    }
};

function onFormClick(evt) {
    formData[evt.target.name] = evt.target.value;
    const formDataStringify = JSON.stringify(formData);
    localStorage.setItem(LOCAL_STORAGE_KEY, formDataStringify);
};

function populateForm() {
    const savedMessage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const formValues = JSON.parse(savedMessage);

    if (formValues) {
        if (typeof formValues['email'] !== "undefined") {
            formInput.value = formValues.email;
        };
        if (typeof formValues['message'] !== "undefined") {
            formTextarea.value = formValues.message;
        };
    };
};

function onFormSubmit(evt) {
    evt.preventDefault();

    if ( formInput.value !== "" &&  formTextarea.value !== "") {
        const  obj = {};
        obj[formInput.name] = formInput.value;
        obj[formTextarea.name] = formTextarea.value;
        console.log(obj);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        evt.currentTarget.reset();
    } else {
        alert('Все поля должны быть заполнены!');  
    };
};

form.addEventListener('input', trottle(onFormClick, 500));
form.addEventListener('submit', onFormSubmit);
populateForm();

 