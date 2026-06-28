#!/bin/bash

# Resolve workspace directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo "Workspace Directory: $SCRIPT_DIR"
echo "Backend Directory: $BACKEND_DIR"
echo "Frontend Directory: $FRONTEND_DIR"

# Helper function to free ports if occupied
kill_port() {
    local port=$1
    local pids=$(lsof -t -i:$port)
    if [ ! -z "$pids" ]; then
        echo "Port $port is occupied by process(es): $pids. Killing..."
        kill -9 $pids 2>/dev/null
        sleep 1
    fi
}

# 1. Start Backend
echo -e "\n=== Starting Backend Setup ==="
cd "$BACKEND_DIR" || { echo "ERROR: Failed to navigate to backend directory"; exit 1; }
echo "Current Directory (Backend Setup): $(pwd)"

if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

source .venv/bin/activate
echo "Installing/updating backend dependencies..."
pip install -r requirements.txt

# Free port 8000 if occupied
kill_port 8000

echo "Launching FastAPI backend on port 8000..."
python run.py &
BACKEND_PID=$!
echo "Backend process launched with PID: $BACKEND_PID"

# Signal cleanup handler
cleanup() {
    # Disable trap to avoid recursive loops
    trap - SIGINT SIGTERM
    echo -e "\n=== Shutting down backend ($BACKEND_PID) and exiting... ==="
    kill $BACKEND_PID 2>/dev/null
    exit 0
}
trap cleanup SIGINT SIGTERM

# 2. Start Frontend
echo -e "\n=== Starting Frontend Setup ==="
cd "$FRONTEND_DIR" || { echo "ERROR: Failed to navigate to frontend directory ($FRONTEND_DIR)"; exit 1; }
echo "Current Directory (Frontend Setup): $(pwd)"

if [ ! -d "node_modules" ]; then
    echo "node_modules not found, installing frontend dependencies..."
    npm install
fi

# Free port 3000 if occupied
kill_port 3000

echo "Launching Vite React frontend on port 3000..."
npm run dev -- --port 3000 --host 0.0.0.0
