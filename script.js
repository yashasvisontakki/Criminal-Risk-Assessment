/* ============================================================
   Criminal Risk Assessment Request - Dynamic Form Logic
   All form data lives in the `formData` object below.
   Changing formData (e.g. via loadData()) updates the UI,
   and changing the UI updates formData automatically.
   ============================================================ */

(function () {
  "use strict";

  // ---------------------------------------------------------
  // 1. Central data model - edit this object (or call
  //    loadData(obj)) to have the UI update dynamically.
  // ---------------------------------------------------------
  const formData = {
    // Consent section
    consentDate: "",
    signature: "",
    unconsented: false,
    witness: "",

    // Person being assessed
    firstName: "",
    secondName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
    otherLastNames: "",
    otherFirstNames: "",
    currentAddress: "",
    currentPhone: "",
    birthPlace: "",

    // Identification
    idBirthCert: false,
    idSIN: false,
    idHealthCard: false,
    idTreatyCard: false,
    idOtherCheck: false,
    idOtherSpecify: "",
    idMBLicense: false,
    mbLicenseNumber: "",

    // Page 2 - agency / assessment info
    nameConfirm: "",
    agencyName: "",
    reasonChildProtection: false,
    reasonPlaceOfSafety: false,
    reasonKinship: false,
    assignedWorker: "",
    lastAssessmentDate: "",
    submittingDesignate: "",
    designatePhone: "",
    designateEmail: "",
    designateFax: "",
    requestDate: ""
  };

  // ---------------------------------------------------------
  // 2. Helpers to sync data -> UI and UI -> data
  // ---------------------------------------------------------
  function getFieldElements(fieldName) {
    return document.querySelectorAll('[data-field="' + fieldName + '"]');
  }

  function applyValueToElement(el, value) {
    if (el.type === "checkbox") {
      el.checked = Boolean(value);
    } else if (el.type === "radio") {
      el.checked = (el.value === value);
    } else {
      el.value = value === undefined || value === null ? "" : value;
    }
  }

  // Render the entire formData object into the UI
  function renderForm() {
    Object.keys(formData).forEach(function (key) {
      const elements = getFieldElements(key);
      elements.forEach(function (el) {
        applyValueToElement(el, formData[key]);
      });
    });
    syncNameConfirm();
  }

  // Keep "NAME OF PERSON BEING ASSESSED" on page 2 in sync with page 1 names
  function syncNameConfirm() {
    const fullName = [formData.firstName, formData.secondName, formData.lastName]
      .filter(Boolean)
      .join(" ");
    if (!formData.nameConfirm || formData.nameConfirm === formData._autoName) {
      formData.nameConfirm = fullName;
      formData._autoName = fullName;
      getFieldElements("nameConfirm").forEach(function (el) {
        el.value = fullName;
      });
    }
  }

  // Public API: load new data into the form (data -> UI direction)
  function loadData(newData) {
    Object.assign(formData, newData);
    renderForm();
  }

  // Attach listeners so any UI change updates formData (UI -> data direction)
  function bindInputs() {
    document.querySelectorAll("[data-field]").forEach(function (el) {
      const field = el.dataset.field;
      const eventName = (el.tagName === "SELECT" || el.type === "checkbox" || el.type === "radio")
        ? "change"
        : "input";

      el.addEventListener(eventName, function () {
        if (el.type === "checkbox") {
          formData[field] = el.checked;
        } else if (el.type === "radio") {
          if (el.checked) formData[field] = el.value;
        } else {
          formData[field] = el.value;
        }

        if (field === "firstName" || field === "secondName" || field === "lastName") {
          formData.nameConfirm = "";
          syncNameConfirm();
        }
      });
    });
  }

  // ---------------------------------------------------------
  // 3. Submit / Print / Reset actions
  // ---------------------------------------------------------
  function handleSubmit() {
    const requiredFields = [
      { key: "agencyName", label: "Name of Agency Submitting Request" },
      { key: "assignedWorker", label: "Assigned Worker" },
      { key: "submittingDesignate", label: "Submitting Designate" },
      { key: "designatePhone", label: "Designate Ph#" },
      { key: "designateEmail", label: "Designate Email#" },
      { key: "requestDate", label: "Request Date" }
    ];

    const missing = requiredFields.filter(function (f) {
      return !formData[f.key];
    });

    const statusEl = document.getElementById("statusMsg");

    if (missing.length > 0) {
      statusEl.style.color = "#b00020";
      statusEl.textContent =
        "Please complete required field(s): " +
        missing.map(function (f) { return f.label; }).join(", ");
      return;
    }

    statusEl.style.color = "#205c20";
    statusEl.textContent = "Form submitted successfully.";

    console.log("Criminal Risk Assessment Request - submitted data:", JSON.parse(JSON.stringify(formData)));

    // Example: this is where the data could be POSTed to a server:
    // fetch('/api/criminal-risk-assessment', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
  }

  function handlePrint() {
    window.print();
  }

  function handleReset() {
    Object.keys(formData).forEach(function (key) {
      if (typeof formData[key] === "boolean") {
        formData[key] = false;
      } else {
        formData[key] = "";
      }
    });
    delete formData._autoName;
    renderForm();
    document.getElementById("statusMsg").textContent = "";
  }

  // ---------------------------------------------------------
  // 4. Init
  // ---------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    bindInputs();
    renderForm();

    document.getElementById("submitBtn").addEventListener("click", handleSubmit);
    document.getElementById("printBtn").addEventListener("click", handlePrint);
    document.getElementById("resetBtn").addEventListener("click", handleReset);
  });

  // Expose for external/dynamic use (e.g. from browser console or other scripts)
  window.CriminalRiskForm = {
    data: formData,
    loadData: loadData,
    render: renderForm
  };
})();
