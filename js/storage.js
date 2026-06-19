
const STORAGE_KEY = "entries";


export function getEntries() {
  const savedEntries = localStorage.getItem(STORAGE_KEY);

  if (!savedEntries) {
    return [];
  }

  try {
    const parsedEntries = JSON.parse(savedEntries);

    return Array.isArray(parsedEntries) ? parsedEntries : [];
  } catch (error) {
    console.error("The saved entries could not be read:", error);
    return [];
  }
}


export function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}


export function addEntry(title, body) {
  const entries = getEntries();

  const newEntry = {
    id: createEntryId(),
    title: title.trim(),
    body: body.trim(),
    createdAt: new Date().toISOString(),
  };


  entries.unshift(newEntry);

  saveEntries(entries);

  return newEntry;
}


function createEntryId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}


export function formatEntryDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}


export function createExcerpt(text, maximumLength = 180) {
  if (text.length <= maximumLength) {
    return text;
  }

  return `${text.slice(0, maximumLength).trim()}…`;
}