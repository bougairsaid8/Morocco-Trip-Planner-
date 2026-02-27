# 🇲🇦 Morocco Trip Planner
### Smart Travel Planning Platform for Exploring Morocco

## 🎓 Graduation Project

**Morocco Trip Planner** is a modern web application designed to help travelers efficiently plan and organize trips across Morocco.

The platform provides an intuitive interface that allows users to build personalized itineraries, visualize destinations on interactive maps, manage travel budgets, and store their trips for future use.

This project was developed as part of a graduation project to demonstrate skills in modern web development, state management, routing, UI design, and user experience optimization.

---

## 🎯 Project Objectives

The main goals of this project are:

- Simplify travel planning within Morocco  
- Provide an interactive and user-friendly experience  
- Help travelers organize daily trip activities  
- Visualize destinations using real-time maps  
- Track travel expenses in Moroccan Dirham (MAD)  
- Secure and manage user data  

---

## 🧠 Problem Statement

Tourists planning trips to Morocco often face difficulties:

- Information scattered across multiple platforms  
- Lack of structured itinerary planning tools  
- Difficulty estimating travel costs  
- No centralized platform for Moroccan destinations  

**Morocco Trip Planner solves these issues by centralizing trip planning into one smart platform.**

---

## 🛠️ Technologies Used

### Frontend
- **React 19** → User interface development  
- **Vite** → Fast development environment & build tool  
- **Redux Toolkit** → State management  
- **React Router** → Navigation & routing  

### Maps & Communication
- **React Leaflet** → Interactive maps integration  
- **EmailJS** → Email sending functionality  

### UI & Styling
- **Emotion CSS** → Component styling  
- **React Icons** → UI icons  

---

## 🧩 Application Architecture

The application follows a **component-based architecture** and centralized state management using Redux Toolkit.

### 🔹 Main Components

#### Core UI
- Navbar  
- PreviewCard  
- TripCard  
- Timeline (Days Planner)  
- MapComponent  

#### Profile Module
- ProfileAside  
- PersonalInfo  
- Security Settings  
- Notification System  

---

## 🗂️ Redux Store Structure

The global state is organized into four slices:

- **auth** → authentication & user session  
- **cityData** → cities and attractions data  
- **planner** → active trip planning data  
- **savedTrips** → stored trips  

---

## 📄 Application Pages

| Page | Description | Access |
|------|------------|--------|
| Home | Landing page | Public |
| Login / Signup | Authentication | Guests only |
| Profile | Manage user information | Protected |
| Planner | Build trip itineraries | Protected |
| My Trips | Saved trips | Protected |
| Trip Details | Trip information | Protected |
| About | Platform information | Public |
| Forgot Password | Password recovery | Guests |

---

## 🔐 Security & Access Control

- **Protected Routes**: accessible only to authenticated users  
- **Guest Routes**: accessible only to non-authenticated users  
- **Public Routes**: accessible to all users  

This ensures secure navigation and user data protection.

---

## ⭐ Key Features

✔ Explore Moroccan cities and attractions  
✔ Drag & drop trip planning interface  
✔ Interactive map visualization  
✔ Budget tracking in MAD  
✔ Save and manage personalized trips  
✔ Secure authentication & profile management  
✔ Email integration for communication  

---

## 🖥️ User Workflow

1. User creates an account or logs in  
2. Selects a Moroccan city  
3. Adds activities to the trip timeline  
4. Visualizes locations on the map  
5. Tracks travel expenses  
6. Saves and manages trips  

---

## 🚀 Installation & Setup

### Clone the repository

```bash
git clone https://github.com/your-username/morocco-trip-planner.git
cd morocco-trip-planner
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

---

🏗️ Production Build

```bash
npm run build
npm run preview
```

---

📈 Future Improvements

- AI-based itinerary suggestions
- Multi-language support
- Trip sharing via public links
- Mobile app version
- Backend integration & cloud database
- Hotel & transport booking integration

---

🎓 Skills Demonstrated

This project demonstrates proficiency in:

- Modern React development
- State management with Redux Toolkit
- Secure routing & authentication logic
- Interactive map integration
- UI/UX design principles
- Modular and scalable architecture

---

👨‍💻 Author

**Said Bougair**  
Full-Stack Web Development Student  
ISTA ASSAKA / OFPPT

---

**Oussama Janal**  
Full-Stack Web Development Student  
ISTA ASSAKA / OFPPT

---

📜 License

This project is developed for educational purposes.