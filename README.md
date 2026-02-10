# Invoice Management App

A modern, single-page **Invoice Management Application** built using **React, Redux Toolkit, and Tailwind CSS**.  
The application allows users to create, edit, manage, and export invoices with real-time calculations and PDF generation.

This project focuses on **state management, clean UI architecture, and real-world business logic** such as discounts, invoice status tracking, and persistent data storage.

---

## Key Features

- Create and edit invoices with dynamic item lists  
- Real-time calculation of **subtotal, discount, and total amount**  
- Invoice status management with **Pending ↔ Paid toggle**  
- Export invoices as **professionally formatted PDF files**  
- Centralized state management using **Redux Toolkit**  
- Persistent data storage using **Browser LocalStorage**  
- Clean, responsive, and modern UI built with **Tailwind CSS**

---

## Functional Overview

The application maintains all invoice data in a **centralized Redux store**.  
Each invoice contains client details, billing information, itemized charges, discount logic, and payment status.

Invoice totals are recalculated automatically whenever item quantity, price, or discount changes.  
Users can view invoice summaries, inspect detailed invoice information, edit existing invoices, and export invoices as PDFs **without any backend dependency**.

---

## Tech Stack

**Frontend**
- React (Vite)

**State Management**
- Redux Toolkit

**Styling**
- Tailwind CSS

**PDF Generation**
- @react-pdf/renderer

**Persistence**
- Browser LocalStorage

**Build Tool**
- Vite

---

## Project Structure

# Invoice Management App

A modern, single-page **Invoice Management Application** built using **React, Redux Toolkit, and Tailwind CSS**.  
The application allows users to create, edit, manage, and export invoices with real-time calculations and PDF generation.

This project focuses on **state management, clean UI architecture, and real-world business logic** such as discounts, invoice status tracking, and persistent data storage.

---

## Key Features

- Create and edit invoices with dynamic item lists  
- Real-time calculation of **subtotal, discount, and total amount**  
- Invoice status management with **Pending ↔ Paid toggle**  
- Export invoices as **professionally formatted PDF files**  
- Centralized state management using **Redux Toolkit**  
- Persistent data storage using **Browser LocalStorage**  
- Clean, responsive, and modern UI built with **Tailwind CSS**

---

## Functional Overview

The application maintains all invoice data in a **centralized Redux store**.  
Each invoice contains client details, billing information, itemized charges, discount logic, and payment status.

Invoice totals are recalculated automatically whenever item quantity, price, or discount changes.  
Users can view invoice summaries, inspect detailed invoice information, edit existing invoices, and export invoices as PDFs **without any backend dependency**.

---

## Tech Stack

**Frontend**
- React (Vite)

**State Management**
- Redux Toolkit

**Styling**
- Tailwind CSS

**PDF Generation**
- @react-pdf/renderer

**Persistence**
- Browser LocalStorage

**Build Tool**
- Vite

---

## Project Structure

src/
├── Component/
│ ├── Header.jsx
│ ├── InvoiceList.jsx
│ ├── InvoiceDetails.jsx
│ ├── InvoiceForm.jsx
│ └── InvoicePDF.jsx
│
├── store/
│ ├── InvoiceSlice.js
│ └── store.js
│
├── App.jsx
├── main.jsx
└── index.css


---

## State Management Logic

Redux Toolkit is used to handle:

- Invoice creation and updates  
- Discount, subtotal, and total calculations  
- Invoice status toggling (Pending / Paid)  
- Form visibility and selected invoice handling  

All updates are performed **immutably through Redux reducers**, ensuring predictable, scalable, and maintainable state transitions.

---

## PDF Generation

Invoices can be exported as PDF files using **@react-pdf/renderer**.

The generated PDF includes:
- Invoice metadata (ID, dates, status)  
- Billing and client details  
- Itemized breakdown  
- Subtotal, discount, and final total  

This closely simulates a **real-world invoicing workflow** used in production applications.

---

## Screenshots

### Invoice List
<img width="1366" height="768" alt="Invoice List" src="https://github.com/user-attachments/assets/203e69fd-e7d9-4947-8e58-97692acf1f7a" />

### Invoice Details
<img width="1366" height="768" alt="Invoice Details" src="https://github.com/user-attachments/assets/dd66f63f-735a-4b0d-ab29-7c0d2d87b502" />

### Create / Edit Invoice
<img width="1366" height="768" alt="Invoice Form" src="https://github.com/user-attachments/assets/29867d86-4673-4181-8661-9ef6e9c412c4" />

### Generated PDF
<img width="1366" height="768" alt="Invoice PDF" src="https://github.com/user-attachments/assets/9a7fa8ad-84fe-4f2e-895c-6bb2c218964e" />

---

## Why This Project Matters

This project demonstrates:

- Practical use of **Redux Toolkit** for non-trivial business logic  
- Clean separation between **UI components and state management**  
- Real-world features such as **PDF generation and invoice workflows**  
- Production-style project structure and maintainable code organization  

This is **not tutorial code** — it reflects industry-level frontend practices.

---

## Future Scope 

- Backend integration (Node.js / Spring Boot)  
- Authentication and user-specific invoices  
- Cloud-based invoice storage  
- Currency and tax configuration  

*(Intentionally excluded to keep the project focused and concise.)*

---

## Author

**Hardik Gupta**  
Frontend Developer (React) | Java & Spring Boot Enthusiast  
