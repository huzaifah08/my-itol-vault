# My ITOL Vault

My ITOL Vault is a responsive, multi-page digital diary built using HTML, CSS and JavaScript.

Users can write private reflections, save them in the browser and view their latest or complete entry history.

## Live Project

[View the live project](https://huzaifah08.github.io/my-itol-vault/)

## GitHub Repository

[View the GitHub repository](https://github.com/huzaifah08/my-itol-vault)

## Screenshot

![My ITOL Vault homepage](./screenshots/home-page.png)

## Project Features

- Responsive multi-page layout
- Homepage showing the five most recent entries
- Dedicated page for writing new reflections
- Complete vault containing every saved entry
- Browser data persistence using localStorage
- DOM manipulation using JavaScript
- Form validation and character counting
- Responsive CSS Grid and Flexbox layouts
- Navigation between all three HTML pages

## Pages

### `index.html`

The homepage displays up to five of the user's most recent reflections in a responsive card grid.

### `new-entry.html`

This page contains a form with:

- A title input
- A reflection textarea
- A Save Entry button
- Form validation
- Character counting

### `vault.html`

The vault displays every saved entry in full-width rows.

## JavaScript and localStorage

The application uses the browser Web Storage API to save diary entries.

localStorage only stores strings, so the entries array is converted into JSON before being stored:

```js
localStorage.setItem("entries", JSON.stringify(entries));