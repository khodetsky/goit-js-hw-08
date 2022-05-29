import trottle from 'lodash.throttle';

const form = document.querySelector(".feedback-form")
const formInput = document.querySelector(".feedback-form input");
const formTextarea = document.querySelector(".feedback-form textarea");

const formData = {};

function onFormClick(evt) {
    formData[evt.target.name] = evt.target.value;
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem("feedback-form-state",formDataJSON)
};

function populateForm() {
    const savedMessage = localStorage.getItem('feedback-form-state');
    const formValues = JSON.parse(savedMessage);
    if (formValues) {
        if (typeof formValues['email'] !== "undefined") {
        formInput.value = formValues.email;
        }else{
        formInput.value = "";
        };

        if (typeof formValues['message'] !== "undefined") {
        formTextarea.value = formValues.message;
        }else{
        formTextarea.value = "";
        };
    };
};

function onFormSubmit(evt) {
    evt.preventDefault();
    const savedMessage = localStorage.getItem('feedback-form-state');
    const formValues = JSON.parse(savedMessage);
    
    if (typeof formValues['email'] !== "undefined" && typeof formValues['message'] !== "undefined") {
        console.log(formValues);

        // Очищаем объект formValues
        for(var key in formData){
        delete formData[key];
        };
        localStorage.removeItem("feedback-form-state");
        evt.currentTarget.reset();
    } else {
        alert('Все поля должны быть заполнены!');
    };
};


form.addEventListener('input', trottle(onFormClick, 500));
form.addEventListener('submit', onFormSubmit);
populateForm();

 