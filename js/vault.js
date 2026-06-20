import {
    createExcerpt,
    formatEntryDate,
    getEntries,
  } from "./storage.js";
  
  const vaultList = document.querySelector("#vault-list");
  const entryTotal = document.querySelector("#entry-total");
  

  const entries = getEntries();
  
  renderVault();
  

  function renderVault() {
    vaultList.innerHTML = "";
  
    updateEntryTotal();
  
    if (entries.length === 0) {
      renderEmptyVault();
      return;
    }
  
    entries.forEach((entry) => {
      const vaultEntry = createVaultEntry(entry);
      vaultList.appendChild(vaultEntry);
    });
  }
  

  function updateEntryTotal() {
    const word = entries.length === 1 ? "reflection" : "reflections";
  
    entryTotal.textContent = `${entries.length} saved ${word}`;
  }
  

  function createVaultEntry(entry) {
    const article = document.createElement("article");
    article.className = "vault-entry";
  
    const date = document.createElement("p");
    date.className = "entry-date";
    date.textContent = formatEntryDate(entry.createdAt);
  
    const content = document.createElement("div");
    content.className = "vault-entry-content";
  
    const title = document.createElement("h2");
    title.textContent = entry.title;
  
    const body = document.createElement("p");
    body.className = "vault-entry-body";
    body.textContent = createExcerpt(entry.body, 420);
  
    content.append(title, body);
    article.append(date, content);
  
    return article;
  }
  

  function renderEmptyVault() {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
  
    const heading = document.createElement("h2");
    heading.textContent = "No reflections saved yet.";
  
    const description = document.createElement("p");
    description.textContent =
      "Once you write an entry, your complete history will appear here.";
  
    const link = document.createElement("a");
    link.className = "button";
    link.href = "./new-entry.html";
    link.textContent = "Create an entry";
  
    emptyState.append(heading, description, link);
    vaultList.appendChild(emptyState);
  }