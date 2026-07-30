# Criminal Risk Assessment Request – Web Form

## Project Overview

This project is a web-based implementation of the **Criminal Risk Assessment Request** form. The objective was to recreate the original PDF form as a responsive and printable web application while preserving the structure and appearance of the original document.

The project is developed using **HTML, CSS, JavaScript, and Pug**. The application runs entirely in the browser without requiring any backend or server setup.

---

## Features

* Responsive web form based on the original PDF
* Dynamic data binding using JavaScript
* Client-side validation for required fields
* Print-friendly layout matching the original document
* Reset functionality to clear all entered data
* Modular Pug template for easier maintenance
* Clean and organized project structure

---

## Project Structure

```
Criminal-Risk-Assessment/

│── index.html
│── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   └── logo.svg
│
└── pug/
    └── index.pug
```

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Pug Template Engine

---

## Project Files

### index.html

Main webpage containing the complete Criminal Risk Assessment Request form.

### css/style.css

Contains all styling for the form, layout, typography, spacing, and print formatting.

### js/script.js

Handles:

* Form data binding
* Validation
* Submit functionality
* Reset functionality
* Print functionality

### assets/logo.svg

Contains the logo displayed in the form header.

### pug/index.pug

Pug version of the web form used to maintain a clean and reusable template structure.

---

## How to Run

1. Download or clone the project.
2. Open the project folder.
3. Double-click **index.html** or open it in any modern web browser.

No additional setup or server configuration is required.

---

## Form Functionalities

### Submit

Validates all required fields and collects the entered information.

### Reset

Clears all input fields and restores the form to its initial state.

### Print

Prints the completed form in a layout similar to the original PDF.

---

## Data Handling

The form data is managed using a JavaScript object. Changes made in the user interface are reflected in the object, and updates to the object are reflected in the form fields, enabling two-way data synchronization.

---

## Learning Outcomes

Through this project, I learned:

* Designing web forms based on official PDF documents
* Creating reusable templates using Pug
* Implementing client-side validation
* Managing form data with JavaScript
* Designing print-friendly web pages
* Organizing a front-end project with a clean folder structure

---

## Author

**Yashasvi Sontakki**
