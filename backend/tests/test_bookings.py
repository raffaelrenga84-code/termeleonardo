"""Backend API tests for Hotel Terme Leonardo bookings endpoints."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://leonardo-refresh.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


def test_create_booking_and_persist(client):
    payload = {
        "nome": "TEST_Mario Rossi",
        "email": "test_mario@example.com",
        "telefono": "+39 000",
        "check_in": "2026-03-01",
        "check_out": "2026-03-05",
        "ospiti": 2,
        "tipo_camera": "Camera Classic",
        "pacchetto": "",
        "messaggio": "pytest booking",
    }
    r = client.post(f"{API}/bookings", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["nome"] == payload["nome"]
    assert data["email"] == payload["email"]
    assert data["check_in"] == payload["check_in"]
    assert data["stato"] == "ricevuta"
    assert "id" in data and isinstance(data["id"], str)

    # verify GET list contains it
    r2 = client.get(f"{API}/bookings")
    assert r2.status_code == 200
    ids = [b["id"] for b in r2.json()]
    assert data["id"] in ids


def test_create_booking_missing_required(client):
    # nome missing -> pydantic 422
    r = client.post(f"{API}/bookings", json={"email": "x@y.z", "check_in": "2026-03-01", "check_out": "2026-03-05"})
    assert r.status_code == 422


def test_get_bookings_returns_list(client):
    r = client.get(f"{API}/bookings")
    assert r.status_code == 200
    assert isinstance(r.json(), list)
    for b in r.json():
        assert "_id" not in b
        assert "id" in b and "email" in b
