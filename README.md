# CRM-APP-Frontend

A React.js-based frontend for a Customer Relationship Management (CRM) web application — built to manage leads, agents, statuses, priorities, tags, and more.

---

## 🔗 Live Demo

👉 **Live App:** https://crm-app-frontend-i9ao.vercel.app/
(Deployed on Vercel)

---

## 🧰 Tech Stack

- **React.js** (functional components + hooks)
- **React Router** for page navigation
- **Axios** (via `axiosInstance`) for API calls
- **Tailwind CSS** for styling
- **Lucide Icons** for UI icons
- **JavaScript (ES6+)**

---

## ✅ Features

- Lead listing with clean UI
- Filter by **priority**, **agent**, **status**, **source**, and **tags**
- Sorting support (priority, close date, etc.)
- Fully responsive layout
- Navigate to create new lead
- Elegant empty-state UI when no results found
- Seamless API integration using axiosInstance

---

## 📁 Folder Structure (simplified)

```

src/
api/ → axios setup
components/ → reusable components
pages/ → LeadList, NewLead, LeadDetails, etc.
assets/ → images/icons
styles/ → Tailwind config or additional CSS

```


---

## 🚀 Getting Started (Local Setup)

1. Clone the repository
   ```bash
   git clone https://github.com/Srushtik942/CRM-APP-Frontend.git
   cd CRM-APP-Frontend

2. Install dependencies

   npm install

3. Start the development server

  npm start

4. Open
  http://localhost:3000



🚀 Features
🎯 Lead Management

View all leads in a clean, responsive interface

Click any lead to open full details

Create new leads via a dedicated form

🔍 Advanced Filtering

Filter leads by:

Priority (High, Medium, Low)

Sales Agent

Status (New, Qualified, etc.)

Source (Referral, Website, Cold Call...)

Tags

Dynamic filters auto-refresh results

↕ Sorting (Extendable)

Sort by:

Priority

Close date

Supports adding custom sort options easily

🧭 Smooth Navigation

Clean routing using React Router

Quick navigation to:

Lead List

Add New Lead

Lead Details Page

📊 API-Driven UI

Fetches leads and agents through REST APIs

Automatically updates UI whenever filters or sorting change

Reusable axiosInstance for clean API integration

📱 Fully Responsive UI

Built with Tailwind CSS

Works seamlessly on:

Desktop

Tablet

Mobile

🎨 Polished UI/UX

Beautiful gradients

Soft shadows and animations

Intuitive empty states

Hover and interaction effects

🧩 Modular Code Structure

Each feature in separate components

Clean folder structure for easy scalability

Reusable buttons, dropdowns, and layout patterns

⚡ Performance Optimized

Minimized re-renders with filtered dependency arrays

Efficient API calls (fetch only when needed)

🛠 Developer Friendly

Easy code extension

Configuration-based filters

Fast build + Vercel deployment
