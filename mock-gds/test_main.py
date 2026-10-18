
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_route_matching_ignores_route_name():
    response = client.get(
        "/mock-gds/search",
        params={
            "source": "Bangalore",
            "destination": "Mumbai",
            "journey_date": "2026-08-09",
        },
    )

    assert response.status_code == 200

    trips = response.json()
    assert len(trips) > 0

    for trip in trips:
        assert trip["from_city_name"].strip().lower() == "bangalore"
        assert trip["to_city_name"].strip().lower() == "mumbai"

    inconsistent_trips = [
        trip
        for trip in trips
        if "jaisalmer" in trip.get("route_name", "").lower()
        or "jodhpur" in trip.get("route_name", "").lower()
    ]

    assert len(inconsistent_trips) > 0, (
        "Expected at least one Bangalore-to-Mumbai trip whose route_name "
        "mentions Jaisalmer or Jodhpur"
    )


def test_unavailable_trips_are_excluded():
    response = client.get(
        "/mock-gds/search",
        params={
            "source": "Bangalore",
            "destination": "Mumbai",
            "journey_date": "2026-08-09",
        },
    )

    assert response.status_code == 200

    for trip in response.json():
        assert trip["availability"]["is_available"] is True
