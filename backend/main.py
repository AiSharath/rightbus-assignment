
from fastapi import FastAPI, HTTPException, Query
import httpx
from datetime import date
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="RightBus Backend")

MOCK_GDS_URL = "http://127.0.0.1:8001/mock-gds/search"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "RightBus Backend is running"}


@app.get("/api/buses/search")
async def search_buses(
    source: str = Query(..., min_length=1),
    destination: str = Query(..., min_length=1),
    journey_date: str = Query(...)
):
    try:
        date.fromisoformat(journey_date)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid journey date. Use YYYY-MM-DD format"
        )
    
    if source.strip().lower() == destination.strip().lower():
        raise HTTPException(
            status_code=400,
            detail="Source and destination must be different"
        )

    params = {
        "source": source.strip(),
        "destination": destination.strip(),
        "journey_date": journey_date
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(MOCK_GDS_URL, params=params)
            response.raise_for_status()
        except httpx.HTTPError:
            raise HTTPException(
                status_code=502,
                detail="Unable to retrieve bus data from Mock GDS"
            )

    trips = response.json()

    requested_source = source.strip().casefold()
    requested_destination = destination.strip().casefold()

    buses = []

    for trip in trips:
        trip_source = trip.get("from_city_name", "").strip().casefold()
        trip_destination = trip.get("to_city_name", "").strip().casefold()

        schedule = trip.get("schedule", {})
        availability = trip.get("availability", {})

        if trip_source != requested_source:
            continue

        if trip_destination != requested_destination:
            continue

        if schedule.get("departure_date") != journey_date:
            continue

        if availability.get("is_available") is not True:
            continue

        pricing = trip["pricing"]

        bus = {
            "trip_id": trip["trip_id"],
            "operator": trip["operator"],
            "bus_type": trip["bus_type"],
            "is_ac": trip["is_ac"],
            "seat_type": trip["bus_seat_type"],
            "departure": schedule["departure_time"],
            "arrival": schedule["arrival_time"],
            "duration_minutes": schedule["duration_minutes"],
            "fare": pricing["total_fare"],
            "available_seats": availability["seats_available"],
            "boarding_points": trip["boarding_points"],
            "dropping_points": trip["dropping_points"]
        }

        buses.append(bus)

    return {"buses": buses}


