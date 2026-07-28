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

## 🏗️ Technical Overview & Architecture

The application is built on a modern, decoupled client-server architecture designed for high performance, maintainability, and scalability.

```
+-------------------------------------------------------------------+
|                        Client Browser                             |
|    Vite + React SPA (TypeScript) | Custom Router | Vanilla CSS    |
+-------------------------------------------------------------------+
                                 |
                         HTTP JSON (/api/*)
                                 |
                                 v
+-------------------------------------------------------------------+
|                    FastAPI Backend (Python)                       |
|   Uvicorn Server | REST Endpoints | Pydantic Schemas | ORM        |
+-------------------------------------------------------------------+
                                 |
                                 v
+-------------------------------------------------------------------+
|                     SQLite Data Store (SQLAlchemy)                |
|       contact_submissions | leadership_members | volunteer_plans  |
+-------------------------------------------------------------------+
```

### 💻 Technology Stack

* **Frontend**:
  * **Framework**: React 18 (TypeScript) built with Vite for sub-millisecond HMR and optimized production bundles.
  * **Styling**: Vanilla CSS with custom `:root` tokens, smooth CSS transitions, custom animations, glassmorphic accents, and dynamic layout bounds.
  * **Icons & UI**: `lucide-react` icons.
  * **State & Routing**: Custom light state-based router providing instant view transitions without heavy external router dependencies.
  * **HTTP Client**: Native browser `fetch` API wrapping `/api/*` endpoints.

* **Backend**:
  * **Framework**: FastAPI (Python 3.10+) with async request processing and automatic Swagger OpenAPI documentation (`/docs`).
  * **Database & ORM**: SQLite (`neasw.db`) managed through SQLAlchemy ORM.
  * **Data Validation**: Pydantic v2 schemas (`EmailStr`, type coercion, and JSON validation).
  * **Server**: Uvicorn ASGI server.
  * **Seeding & Booting**: Automated DB seeder script executed at startup to ensure default data presence.

---

## 🔌 Technical Details & API Endpoints

### 💾 Database Schema (`neasw.db`)

The backend utilizes SQLAlchemy ORM with three core tables:

1. **`contact_submissions`**:
   * `id` (INTEGER, Primary Key, Autoincrement)
   * `name` (VARCHAR, Required)
   * `email` (VARCHAR, Required)
   * `phone_number` (VARCHAR, Required)
   * `organization_name` (VARCHAR, Optional)
   * `preferred_date` (VARCHAR, Optional)
   * `message` (TEXT, Required)
   * `created_at` (DATETIME, Default: UTC Now)

2. **`leadership_members`**:
   * `id` (INTEGER, Primary Key)
   * `name` (VARCHAR, Required)
   * `position` (VARCHAR, Required)
   * `chapter` (VARCHAR, Required)

3. **`volunteer_plans`**:
   * `id` (INTEGER, Primary Key)
   * `duration_months` (INTEGER, Required)
   * `title` (VARCHAR, Required)
   * `features` (JSON / TEXT Array, Required)

---

### 🌐 Backend REST API Specs

| Method | Route | Description | Request Payload | Response Schema |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/about/leadership` | Fetches active roster of regional chapter leadership. | None | `List[LeadershipMember]` |
| **GET** | `/api/join/volunteer-plans` | Fetches tiered volunteering plans & durations. | None | `List[VolunteerPlan]` |
| **POST** | `/api/contact/submit` | Validates & saves user contact/volunteer inquiries. | `ContactFormSubmit` (JSON) | `{ "status": "success", "id": int, "message": str }` |
| **GET** | `/api/contact/info` | Returns organizational contact details & social channels. | None | `ContactInfo` |

> 📖 **Full Documentation:** For an in-depth dive into internal backend file structures, frontend CSS variable design tokens, component hierarchies, and mock email services, view [TECHNICAL_DOCUMENTATION.md](file:///Users/g10/Sync/deploy_project/ngo/TECHNICAL_DOCUMENTATION.md).

---

## 📂 Project Directory Structure

```
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── api/              # Controller endpoints & routing logic
│   │   ├── core/             # DB configuration, session management & seeder
│   │   ├── models/           # SQLAlchemy DB models & Pydantic validation schemas
│   │   └── services/         # Mock email service & helper integrations
│   ├── run.py                # Server entry point
│   ├── requirements.txt      # Python dependencies
│   └── neasw.db              # SQLite Database
├── frontend/                 # Vite React Application
│   ├── src/
│   │   ├── assets/           # High-resolution local image files & brand assets
│   │   ├── components/       # Header, Footer, Conversion blocks
│   │   ├── pages/            # View components (Home, About, Work, Join, Contact)
│   │   └── services/         # API HTTP client wrapper (`api.ts`)
│   ├── package.json          # Node dependencies
│   └── vite.config.ts        # Vite configuration
├── run.sh                    # Startup boot script (port cleanup & launch)
├── vercel.json               # Vercel deployment routing & API rewrites
├── TECHNICAL_DOCUMENTATION.md # Comprehensive technical specifications
└── README.md                 # Project Overview & Setup Guide
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
