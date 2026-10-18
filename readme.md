# RightBus — Bus Search Application

A full-stack bus search application built for the RightBus Full Stack Intern assignment.

## Features

- Search buses by source, destination, and journey date.
- View bus operator, timings, duration, fare, seat type, and available seats.
- Filter by AC/Non-AC and Sleeper/Seater.
- Sort by price and departure time.
- View boarding and dropping points.
- Handle loading, empty results, and API errors.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Python, FastAPI
- **Mock GDS:** FastAPI with a local JSON dataset
- **Testing:** Pytest, RESpx

## Project Structure

```text
rightbus-assignment/
├── backend/
│   ├── main.py
│   ├── test_main.py
│   └── requirements.txt
├── mock-gds/
│   ├── main.py
│   ├── data.json
│   └── requirements.txt
├── frontend/
│   ├── src/
│   └── package.json
└── README.md
```

## Setup and Run

Requires Python, Node.js, and npm.

### 1. Start Mock GDS

```bash
cd mock-gds
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8001
```

### 2. Start the Backend

Open a new terminal from the project root:

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

API documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 3. Start the Frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## API Endpoint

**Search buses**

```http
GET /api/buses/search?source=Bangalore&destination=Mumbai&journey_date=2026-08-09
```

The backend calls Mock GDS, filters available trips, and returns the results to the frontend. The frontend communicates only with the backend.

## Run Tests

From the project root:

```bash
cd backend
python -m pytest -v
```

Tests cover successful searches, empty results, missing parameters, and identical source and destination.

## Note

The application uses the assignment's local sample dataset. Bus availability and fares are not live data.
