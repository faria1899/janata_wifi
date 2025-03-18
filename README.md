# Stock Market Data Management and Visualization System

## Introduction
This project is a **Stock Market Data Management and Visualization System** built using **React.js, Chart.js, Axios, MySQL, Flask, and REST API**. It allows users to manage stock market data, perform CRUD operations, and visualize stock trends efficiently.

## Features
### **Frontend (React.js)**
- **Dynamic Table View:** Fetch, create, update, and delete stock market data.
- **Data Visualization:** Interactive **line, bar, and multi-axis charts** using Chart.js.
- **Filtering & Pagination:** Users can filter stocks by trade code and navigate through paginated data.

### **Backend (Flask)**
- **RESTful API with Flask:** Provides endpoints for CRUD operations.
- **MySQL Integration:** Perform dynamic fetch, create, update, and delete operations.
- **CORS Support:** Allows communication between frontend and backend.

## **Tech Stack**
### **Frontend**
- React.js
- React Router DOM
- React Hooks
- Chart.js (react-chartjs-2)
- Axios (REST API calls)

### **Backend**
- Flask
- Flask-CORS
- MySQL

### **Database**
- MySQL

## **Installation & Setup**
### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (v22.13.0)
- **MySQL**
- **Python** (3.11.5)

### **Clone the Repository**
```sh
git clone https://github.com/faria1899/janata_wifi.git
cd janata_wifi
```

### **Install Dependencies**
#### **Frontend:**
```sh
npm install react-router-dom
npm install axios
npm install chart.js react-chartjs-2
```
#### **Backend:**
```sh
pip install Flask
pip install mysql-connector-python
pip install pandas
```

### **Run the Flask Server**
```sh
python new.py
```

## **What I Learned**
- Setting up a **Flask REST API** with MySQL.
- Implementing **CRUD operations** in Flask using REST API.
- Handling **CORS** in Flask to allow frontend-backend communication.
- Efficiently handling **bulk data insertions**.
- Making API calls using **Axios** for fetching, creating, deleting, and updating stock market data.
- Managing **asynchronous data fetching** and using `useEffect` for initial data loading.
- Implementing **multiple chart types** (line, bar, multi-axis) using Chart.js.
- Understanding **Chart.js datasets, options, and axis configurations**.
- Extracting unique trade codes for **dynamic data filtering**.
- Using `map()` and `filter()` for manipulating and displaying data.
- Formatting dates using JavaScript (`toISOString().split('T')[0]`).
- Implementing **pagination** using `slice()` to handle large datasets.
- Handling **routing & navigation** using React Router DOM.
- Debugging **API calls and state updates**.

## **Challenges Faced**
- Handling **API request failures** and implementing error handling using `try-catch`.
- Formatting **dates correctly** for form inputs (`<input type="date" />`).
- Converting **volume values** from string to numbers (`parseFloat(item.volume.replace(/,/g, ""))`).
- Handling **reserved MySQL keywords** (`open`, `close`) using **backticks (`) in SQL queries**.



