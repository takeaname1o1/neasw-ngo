# NEASW Welfare Foundation NGO Web App

A modern, highly interactive web application for the **NEASW Welfare Foundation**, built using a decoupled architecture: a premium Vite + React frontend powered by a FastAPI + SQLite backend.

> 📘 **Technical Documentation:** For a detailed breakdown of the frontend, backend, database models, and deployment configurations, refer to the [Technical Documentation](file:///Users/g10/Sync/deploy_project/ngo/TECHNICAL_DOCUMENTATION.md).

---

## 🏗️ Architecture & Tech Stack

- **Frontend**:
  - React (TypeScript) + Vite
  - Styled with Vanilla CSS & React Inline Styles (premium custom design, fully responsive)
  - Routing: Custom state-based router supporting seamless navigation and transition effects
  - Icons: `lucide-react`
- **Backend**:
  - FastAPI (Python)
  - Database: SQLite (SQLAlchemy ORM)
  - Data seeding scripts for volunteer plans, leadership records, and contact details
  - Automatic port killing (`run.sh`) to prevent port collision warnings

---

## 📂 Project Directory Structure

```
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── api/              # API endpoints (leadership, plans, contacts)
│   │   ├── core/             # Database connection, seeder & config
│   │   └── models/           # SQLAlchemy schemas & Pydantic models
│   ├── run.py                # Server entry point
│   ├── requirements.txt      # Python dependencies
│   └── neasw.db              # SQLite Database
├── frontend/                 # Vite React Application
│   ├── src/
│   │   ├── assets/           # High-resolution local image files
│   │   ├── components/       # Header, Footer, Conversion blocks
│   │   ├── pages/            # Home, About, Work, Join, Contact
│   │   └── services/         # API services (relative path routing)
│   ├── package.json          # Node dependencies
│   └── vite.config.ts        # Vite configuration
├── run.sh                    # Startup boot script (port cleanup & launch)
└── vercel.json               # Vercel deployment routing & API rewrites
```

---

## 🚀 Local Development Setup

To run the application locally on your macOS system:

1. **Prerequisites**: Make sure you have **Node.js** (v18+) and **Python** (3.10+) installed.
2. **Launch with Auto Boot**:
   In the root directory, run the launch script:
   ```bash
   ./run.sh
   ```
   *This script automatically kills any occupying processes on ports `3000` (frontend) and `8000` (backend), initializes the Python virtual environment (`.venv`), installs dependencies, seeds the database, and runs both servers simultaneously.*
3. **Access the Application**:
   - Frontend: `http://localhost:3000/` or `http://localhost:3001/`
   - FastAPI Interactive docs: `http://localhost:8000/docs`

---

## 🌐 Deployment Guide: Frontend on Vercel

Vite + React single-page applications are extremely fast to deploy on Vercel.

### Step 1: Deploy your Backend
Since the React frontend makes relative calls to `/api/...`, your FastAPI backend must be deployed first.
1. Deploy the `backend/` folder to a service like **Railway** or **Render**.
2. Note your deployed backend URL (e.g. `https://neasw-backend-production.up.railway.app`).

### Step 2: Configure Vercel API Rewrites
1. Open the root [vercel.json](file:///Users/g10/Sync/deploy_project/ngo/vercel.json) file.
2. Replace the `destination` URL in the `/api` rewrite block with your live backend API URL:
   ```json
   {
     "source": "/api/:path*",
     "destination": "https://YOUR_LIVE_BACKEND_URL/api/:path*"
   }
   ```
3. Commit and push this change to your GitHub repository:
   ```bash
   git add vercel.json
   git commit -m "Update backend API deployment URL"
   git push origin master
   ```

### Step 3: Connect GitHub to Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository `neasw-ngo`.
4. In the Project Configuration:
   - **Framework Preset**: Select `Vite`.
   - **Root Directory**: Select `frontend` (this tells Vercel to build the Vite app located in the `frontend/` subdirectory).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Vercel will build the frontend and serve it at a public `.vercel.app` URL.

---

## ⚡ Deployment Guide: Backend on Railway

To quickly deploy the FastAPI backend on Railway:
1. Log in to [Railway.app](https://railway.app).
2. Click **New Project** > **Deploy from GitHub repo**.
3. Choose the `neasw-ngo` repository.
4. Add a variable in Railway settings:
   - **Root Directory**: `backend` (this builds and executes just the backend code).
5. Railway will read the `requirements.txt` file and boot the app using `uvicorn app.main:app --host 0.0.0.0 --port $PORT` automatically.

---

## 🎨 Recent Enhancements & Design Updates

- **Homepage Hero Banner:** Swapped the legacy banner with a fresh high-resolution banner [home_banner.png](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/assets/home/home_banner.png).
- **Impact Section Illustration:** Updated the central impact illustration [impact.png](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/assets/home/impact.png) to separate general impact branding from the user portraits.
- **Upgraded Partners Grid:** Added four high-quality partner logos (`Assam_rifles.png`, `Home_Affairs.png`, `NE_doner.png`, `science_techno.png`) and updated the layout of the homepage strip. Added smooth lifting micro-animations and grayscale-to-color hover transitions for a modern, interactive look.
