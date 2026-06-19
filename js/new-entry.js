import { addEntry } from "./storage.js";

const entryForm = document.querySelector("#entry-form");
const titleInput = document.querySelector("#entry-title");
const bodyInput = document.querySelector("#entry-body");
const saveButton = document.querySelector("#save-entry-button");
const formMessage = document.querySelector("#form-message");
const characterCount = document.querySelector("#character-count");
const currentDate = document.querySelector("#current-date");


currentDate.textContent = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());


bodyInput.addEventListener("input", () => {
  characterCount.textContent = `${bodyInput.value.length} / 5000`;
});


saveButton.addEventListener("click", saveEntry);

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveEntry();
});


function saveEntry() {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();


  console.log("Entry title:", title);
  console.log("Entry body:", body);

  clearMessage();

  if (!title || !body) {
    showMessage(
      "Please enter both a title and a reflection before saving."
    );

    return;
  }

  const savedEntry = addEntry(title, body);

  console.log("Saved entry:", savedEntry);

  showMessage("Your reflection has been saved.", true);


  window.setTimeout(() => {
    window.location.href = "./index.html";
  }, 500);
}


function showMessage(message, isSuccess = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("success", isSuccess);
}


function clearMessage() {
  formMessage.textContent = "";
  formMessage.classList.remove("success");
}