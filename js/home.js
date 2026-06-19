import {
    createExcerpt,
    formatEntryDate,
    getEntries,
  } from "./storage.js";
  
  const entriesGrid = document.querySelector("#entries-grid");

  const allEntries = getEntries();
  

  const recentEntries = allEntries.slice(0, 5);
  
  renderRecentEntries();
  

  function renderRecentEntries() {

    entriesGrid.innerHTML = "";
  
    if (recentEntries.length === 0) {
      renderEmptyState();
      return;
    }
  
    recentEntries.forEach((entry, index) => {
      const entryCard = createEntryCard(entry, index);
      entriesGrid.appendChild(entryCard);
    });
  }
  

  function createEntryCard(entry, index) {
    const article = document.createElement("article");
    article.classList.add("entry-card");
  

    if (index === 0) {
      article.classList.add("entry-card-featured");
    }
  
    if (index === 1 || index === 3) {
      article.classList.add("entry-card-soft");
    }
  
    if (index === 3) {
      article.classList.add("entry-card-wide");
    }
  
    const cardContent = document.createElement("div");
  
    const date = document.createElement("p");
    date.className = "entry-date";
    date.textContent = formatEntryDate(entry.createdAt);
  
    const title = document.createElement("h3");
    title.textContent = entry.title;
  
    const excerpt = document.createElement("p");
    excerpt.className = "entry-excerpt";
    excerpt.textContent = createExcerpt(entry.body);
  
    const footer = document.createElement("p");
    footer.className = "entry-card-footer";
    footer.textContent = "Private reflection";
  
    cardContent.append(date, title, excerpt);
    article.append(cardContent, footer);
  
    return article;
  }
  

  function renderEmptyState() {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
  
    const heading = document.createElement("h2");
    heading.textContent = "Your vault is waiting.";
  
    const description = document.createElement("p");
    description.textContent =
      "Create your first reflection and it will appear here.";
  
    const link = document.createElement("a");
    link.className = "button";
    link.href = "./new-entry.html";
    link.textContent = "Write your first entry";
  
    emptyState.append(heading, description, link);
    entriesGrid.appendChild(emptyState);
  }