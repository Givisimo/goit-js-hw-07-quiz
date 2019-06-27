"use strict";
import quiz from "./quiz-data.js";

const quizForm = document.querySelector(".quiz__form");
const button = document.querySelector("button");
quizForm.classList.add("js-submit");

const createQuestionSection = function(quiz) {
  quiz.questions.map(el => {
    const questionSection = document.createElement("section");
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = el.question;
    const idxQuestion = quiz.questions.indexOf(el);
    questionSection.append(questionTitle);
    questionSection.append(createQuestionChoices(el.choices, idxQuestion));
    button.before(questionSection);
  });
};

const createQuestionChoices = function(choices, idx) {
  const questionChoiceList = document.createElement("ol");
  let questionChoices = [];

  questionChoices = choices.map(choice =>
    createQuestionChoiceItem(choice, idx)
  );
  questionChoiceList.append(...questionChoices);
  return questionChoiceList;
};

const createQuestionChoiceItem = function(choice, idx) {
  const questionChoiceItem = document.createElement("li");

  const label = document.createElement("label");
  const input = `<input type="radio" name="${idx +
    1} question" value="" /> ${choice}`;

  label.insertAdjacentHTML("afterbegin", input);
  questionChoiceItem.append(label);

  return questionChoiceItem;
};

const createHeading = function(quiz) {
  const quizTitleWrapper = document.createElement("div");
  quizTitleWrapper.classList.add("heading_wrapper");
  const quizTitle = document.createElement("h1");
  quizTitle.textContent = quiz.title;
  quizTitleWrapper.append(quizTitle);
  quizForm.prepend(quizTitleWrapper);
};

const createQuiz = function(quiz) {
  createHeading(quiz);
  createQuestionSection(quiz);
};
createQuiz(quiz);
quizForm.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const questionOne = [...form.elements["1 question"]];
  const questionTwo = [...form.elements["2 question"]];
  const questionThree = [...form.elements["3 question"]];
  const questionFour = [...form.elements["4 question"]];
  const questionFive = [...form.elements["5 question"]];
  const questionSix = [...form.elements["6 question"]];
  const data = [
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    questionFive,
    questionSix
  ];

  const allAnswers = { ...getAllAnswers(data) };
  const allCorrectAnswers = { ...getAllCorrectAnswers(quiz.questions) };

  const final = compareAnswers(allAnswers, allCorrectAnswers);

  if (final / quiz.questions.length > 0.8) {
    const text = "You passed";
    quizForm.append(createElem(text));
  } else {
     const text = "Try again";
    quizForm.append(createElem(text));
  }
}

function getAllCorrectAnswers(quiz) {
  return quiz.map(el => el.answer);
}

function getAllAnswers(data) {
  return data.map(arr => getIndexChoice(arr, getChoice(arr)));
}
function getChoice(choices) {
  return choices.find(elem => {
    if (elem.checked === true) return elem;
  });
}

function getIndexChoice(choices, choice) {
  return choices.indexOf(choice);
}

function compareAnswers(obj1, obj2) {
  let final = [];
  for (let key in obj1) {
    if (Object.is(obj1[key], obj2[key])) {
      final.push(obj1[key]);
    }
  }
  return final.length;
}

function createElem(text) {
  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add("result_wrapper");
  const heading = document.createElement("h3");
  heading.textContent = text;
  resultWrapper.append(heading);
  return resultWrapper;
}
