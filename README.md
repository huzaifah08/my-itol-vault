# My ITOL Vault

My ITOL Vault is a responsive, multi-page digital diary built using HTML, CSS and JavaScript.

Users can write private reflections, save them in their browser and view either their five most recent entries or their complete entry history.

## Live Project

[View the live project](https://huzaifah08.github.io/my-itol-vault/)

## GitHub Repository

[View the GitHub repository](https://github.com/huzaifah08/my-itol-vault)

## Screenshot

![My ITOL Vault homepage](https://github.com/huzaifah08/my-itol-vault/blob/main/screenshot/home-page.png)

## Project Features

* Responsive multi-page layout
* Homepage showing the five most recent entries
* Dedicated page for writing new reflections
* Complete vault containing every saved entry
* Browser data persistence using `localStorage`
* DOM manipulation using JavaScript
* Form validation and character counting
* Responsive CSS Grid and Flexbox layouts
* Navigation between all three HTML pages

## Pages

### `index.html`

The homepage displays up to five of the user's most recent reflections in a responsive card grid.

### `new-entry.html`

The New Entry page contains a form with:

* A title input
* A reflection textarea
* A Save Entry button
* Form validation
* Character counting

### `vault.html`

The Vault page displays every saved reflection in full-width rows.

## How localStorage Is Used

The project uses the browser's Web Storage API through `localStorage`.

`localStorage` allows the diary entries to remain saved after the page is refreshed or the browser is closed.

However, `localStorage` can only store information as strings. The diary entries are stored as an array of JavaScript objects, so `JSON.stringify()` is used to convert the array into a JSON string before it is saved.

```js
localStorage.setItem("entries", JSON.stringify(entries));
```

When the application needs to retrieve the entries, `localStorage.getItem()` returns the saved JSON string.

`JSON.parse()` then converts that string back into a JavaScript array.

```js
const savedEntries = localStorage.getItem("entries");

const entries = savedEntries
  ? JSON.parse(savedEntries)
  : [];
```

The fallback empty array ensures the application still works when no entries have been saved yet.

The project also checks that the parsed value is an array before using it:

```js
export function getEntries() {
  const savedEntries = localStorage.getItem("entries");

  if (!savedEntries) {
    return [];
  }

  try {
    const parsedEntries = JSON.parse(savedEntries);

    return Array.isArray(parsedEntries)
      ? parsedEntries
      : [];
  } catch (error) {
    console.error("The saved entries could not be read:", error);
    return [];
  }
}
```

## Saving a New Entry

When the user clicks the Save Entry button, JavaScript reads the title and reflection using the `.value` property.

```js
const title = titleInput.value.trim();
const body = bodyInput.value.trim();
```

A new entry object is then created:

```js
const newEntry = {
  id: createEntryId(),
  title: title,
  body: body,
  createdAt: new Date().toISOString(),
};
```

The new entry is added to the beginning of the entries array using `unshift()`:

```js
entries.unshift(newEntry);
```

Using `unshift()` means the newest entry is always placed at index `0`, before the older entries.

The updated array is then saved back into `localStorage`:

```js
localStorage.setItem("entries", JSON.stringify(entries));
```

## Five Most Recent Entries Logic

The homepage should only display the five newest diary entries.

First, JavaScript retrieves the complete entries array from `localStorage`:

```js
const allEntries = getEntries();
```

Because new entries are added to the beginning of the array using `unshift()`, the array is already arranged from newest to oldest.

The homepage then uses `slice(0, 5)`:

```js
const recentEntries = allEntries.slice(0, 5);
```

The `slice()` method creates a new array containing entries from index `0` up to, but not including, index `5`.

This means it returns a maximum of five entries:

* Index `0` — newest entry
* Index `1` — second newest entry
* Index `2` — third newest entry
* Index `3` — fourth newest entry
* Index `4` — fifth newest entry

If fewer than five entries exist, `slice(0, 5)` simply returns all available entries.

JavaScript then loops through the `recentEntries` array:

```js
recentEntries.forEach((entry, index) => {
  const entryCard = createEntryCard(entry, index);
  entriesGrid.appendChild(entryCard);
});
```

For each entry, JavaScript creates a card using DOM manipulation and adds it to the homepage grid.

## Full Vault Logic

The Vault page retrieves the same complete entries array:

```js
const entries = getEntries();
```

Unlike the homepage, the Vault page does not use `slice(0, 5)`.

Instead, it loops through the entire array:

```js
entries.forEach((entry) => {
  const vaultEntry = createVaultEntry(entry);
  vaultList.appendChild(vaultEntry);
});
```

This allows the user to scroll through their complete diary history.

## DOM Manipulation

The saved entries are not permanently written into the HTML.

JavaScript creates the required HTML elements dynamically using methods such as:

```js
document.createElement();
```

```js
element.textContent = "Example text";
```

```js
parentElement.appendChild(childElement);
```

This allows the homepage and Vault page to update automatically based on the entries saved in `localStorage`.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* DOM manipulation
* Web Storage API
* `localStorage`
* `JSON.stringify()`
* `JSON.parse()`
* JavaScript arrays and objects
* Array `unshift()`
* Array `slice()`
* Array `forEach()`
* CSS Grid
* Flexbox
* Git
* GitHub
* GitHub Pages

## Project Structure

```text
my-itol-vault/
├── index.html
├── new-entry.html
├── vault.html
├── styles.css
├── README.md
├── js/
│   ├── storage.js
│   ├── home.js
│   ├── new-entry.js
│   └── vault.js
└── screenshot/
    └── home-page.png
```

## Running the Project Locally

The JavaScript files use ES6 modules, so the project should be served over HTTP rather than opening `index.html` directly as a local file.

### Using VS Code Live Server

1. Download or clone the repository.
2. Open the project folder in VS Code.
3. Install the Live Server extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. Open the browser console to view the JavaScript output.

## What I Learned

During this project, I learned:

* How to create a responsive multi-page website
* How to navigate between separate HTML pages
* How to select HTML elements using `document.querySelector()`
* How to retrieve form values using `.value`
* How to use JavaScript event listeners
* How to create and store JavaScript objects
* How to save arrays in `localStorage`
* Why `JSON.stringify()` is required when saving arrays
* How `JSON.parse()` restores stored JSON into JavaScript data
* How `unshift()` keeps the newest entry at the start of an array
* How `slice(0, 5)` selects the five most recent entries
* How to render saved entries using DOM manipulation
* How to display the complete entry history on a separate page
* How to use Git and GitHub to track development progress

## MDN Documentation

The following MDN documentation was used to understand the Web Storage API and `localStorage`:

* [MDN: Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
* [MDN: Window localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* [MDN: JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
* [MDN: JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
* [MDN: Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
