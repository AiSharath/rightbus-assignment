
import respx
from fastapi.testclient import TestClient
from httpx import Response

from main import app

client = TestClient(app)

MOCK_URL = "http://127.0.0.1:8001/mock-gds/search"


def test_bangalore_to_mumbai():
    sample_trip = {
        "trip_id": "TRP-120807",
        "operator": "Test Operator",
        "bus_type": "AC Sleeper",
        "is_ac": True,
        "bus_seat_type": "Sleeper",
        "schedule": {
            "departure_time": "4:00 PM",
            "arrival_time": "11:00 AM",
            "duration_minutes": 1140,
            "departure_date": "2026-08-09",
        },
        "pricing": {"total_fare": 2426},
        "availability": {
            "seats_available": 16,
            "is_available": True,
        },
        "boarding_points": [],
        "dropping_points": [],
    }

    with respx.mock(assert_all_called=False) as router:
        router.get(MOCK_URL).mock(
            return_value=Response(200, json=[sample_trip])
        )

        response = client.get(
            "/api/buses/search",
            params={
                "source": "Bangalore",
                "destination": "Mumbai",
                "journey_date": "2026-08-09",
            },
        )

    assert response.status_code == 200
    assert len(response.json()["buses"]) == 1
    assert response.json()["buses"][0]["trip_id"] == "TRP-120807"


def test_bangalore_to_delhi():
    with respx.mock(assert_all_called=False) as router:
        router.get(MOCK_URL).mock(
            return_value=Response(200, json=[])
        )

        response = client.get(
            "/api/buses/search",
            params={
                "source": "Bangalore",
                "destination": "Delhi",
                "journey_date": "2026-08-09",
            },
        )

    assert response.status_code == 200
    assert response.json()["buses"] == []


def test_missing_source():
    response = client.get(
        "/api/buses/search",
        params={
            "destination": "Mumbai",
            "journey_date": "2026-08-09",
        },
    )

    assert response.status_code == 422


def test_missing_destination():
    response = client.get(
        "/api/buses/search",
        params={
            "source": "Bangalore",
            "journey_date": "2026-08-09",
        },
    )

    assert response.status_code == 422


def test_same_source_and_destination():
    response = client.get(
        "/api/buses/search",
        params={
            "source": "Bangalore",
            "destination": "Bangalore",
            "journey_date": "2026-08-09",
        },
    )

    assert response.status_code == 400
