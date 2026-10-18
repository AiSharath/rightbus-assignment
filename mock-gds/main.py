from fastapi import FastAPI
import json
from pathlib import Path
from fastapi import FastAPI

DATA_FILE = Path(__file__).parent / "data.json"

with open(DATA_FILE, "r", encoding="utf-8") as file:
    trips = json.load(file)["trips"]


app = FastAPI(title="RightBus Mock GDS API")


@app.get("/")
def home():
    return {"message": "Mock GDS API is running"}


@app.get("/mock-gds/search")
def search_buses(
    source: str,
    destination: str,
    journey_date: str
):
    results = []

    for trip in trips:
        print(
            trip["trip_id"],
            trip["from_city_name"],
            trip["to_city_name"],
            trip["schedule"]["departure_date"],
            trip["availability"]["is_available"]
        )

        if (
            trip["from_city_name"].strip().lower() == source.strip().lower()
            and trip["to_city_name"].strip().lower() == destination.strip().lower()
            and trip["schedule"]["departure_date"] == journey_date
            and trip["availability"]["is_available"] is True
        ):
            results.append(trip)

    return results