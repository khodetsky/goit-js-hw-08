import trottle from 'lodash.throttle';

const form = document.querySelector(".feedback-form")
const formInput = document.querySelector(".feedback-form input");
const formTextarea = document.querySelector(".feedback-form textarea");

const formData = {};

function onFormClick(evt) {
    formData[evt.target.name] = evt.target.value;
    const formDataJSOM = JSON.stringify(formData);
    localStorage.setItem("feedback-form-state", formDataJSOM)
};

function populateForm() {
    const savedMessage = localStorage.getItem('feedback-form-state');
    const formValues = JSON.parse(savedMessage);
    if (savedMessage) {
        formInput.value = formValues.email; 
        formTextarea.value = formValues.message;  
    }
}

form.addEventListener('input', onFormClick);
form.addEventListener('input', populateForm)

// function onFormInputClick(evt) {
//     const email = evt.target.value;
//     console.log(email);
// };

// function onTextareaInput(evt) {
//     const message = evt.target.value;
//     console.log(message);
// };

// formInput.addEventListener('input', onFormInputClick);
// formTextarea.addEventListener('input', onTextareaInput)
 