# SportsBuddy

**SportsBuddy** is a web-based sports event management platform that allows users to browse upcoming sports events, and enables admins to add or remove events. The platform uses Firebase for authentication, database management, and hosting.

## 🚀 Features

- 🔒 Secure authentication (Firebase Auth)
- 📅 Real-time sports event listings
- 👤 Role-based access (Admin vs User)
- ☁️ Firebase Firestore integration
- 🌐 Fully responsive web design
- 🎨 Dark theme UI

## 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Firebase Functions
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Hosting:** Firebase Hosting

## 🔧 Project Structure
Sports_Buddy/
├── public/ # Static web assets (HTML, CSS, images)
├── scripts/ # JavaScript logic (auth, events)
├── functions/ # Cloud functions (optional)
├── firebase.json # Firebase configuration
├── firestore.rules # Database security rules
├── firestore.indexes.json

## 📝 Roles

- **Admin**
  - Add new sports events
  - Delete outdated or canceled events
- **User**
  - View upcoming events
  - No permission to modify content

## 🚀 Getting Started

### 1. Clone the Repository

bash
git clone https://github.com/your-username/sports-buddy.git
cd sports-buddy

2. Setup Firebase
   
Go to Firebase Console

Create a new project

Add web app credentials to firebaseConfig.js

Set up Firestore and Authentication

3. Deploy

firebase login
firebase init
firebase deploy

👤 Author
Avish Bansal

Thapar Institute of Engineering & Technology

COE-2025
