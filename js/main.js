const container = document.querySelector('.container');
const logo = document.querySelector('.logo');
const formContent = document.getElementById('form-content');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const fieldInput = document.getElementById('field-input');
const labelInput = document.getElementById('label-input');
const group = document.getElementById('input-group');
const errorMsg = document.getElementById('error-msg')


// questions
const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /^\S+@\S+\.\S+$/ },
    { question: 'Enter Your Password', type: 'password' }
];

let position = 0;

// load questions
function loadQuestions() {
    labelInput.innerHTML = questions[position].question;
    fieldInput.type = questions[position].type || 'text';
    fieldInput.value = questions[position].answer || '';
    fieldInput.focus();

    showQuestion();
}

// next question
function nextQuestion() {
    if (!fieldInput.value.match(questions[position].pattern || /.+/)) {
        inputFailed();
    } else {
        inputSuccess();
    }
}


function hideQuestion() {
    group.style.opacity = 0;
}

// check validation
function inputFailed() {
    errorMsg.style.opacity = 1;
    setTimeout(() => errorMsg.remove(), 1000);
}

function inputSuccess() {
    group.className = '';
    questions[position].answer = fieldInput.value;
    position++;

    if (questions[position]) {
        hidePreviousQuestion();
        loadQuestions();
    } else {
        hideQuestion();
        formComplete();
    }
}

// previous question
function prevQuestion() {
    group.className = '';
    console.log('prev');
    position--;

    if (questions[position]) {
        hideQuestion();
        loadQuestions();
    }
}

// show questions
function showQuestion() {
    group.style.opacity = 1;
}
function hidePreviousQuestion() {
    group.style.opacity = 0;
}

function formComplete() {
    group.style.display = 'none';
    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';

    const text = document.createElement('h1');
    text.textContent = 'Thank you. Please check your email';
    text.style.fontWeight = '400';
    text.style.padding = '1rem 2rem';
    text.style.textAlign = 'center';
    formContent.appendChild(text);
}

document.addEventListener('DOMContentLoaded', loadQuestions);
btnNext.addEventListener('click', nextQuestion);
btnPrev.addEventListener('click', prevQuestion);
fieldInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        nextQuestion()
    }
})
