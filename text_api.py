from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_start():
    res = client.get("/ivr/start")
    assert res.status_code == 200

def test_flow():
    call_id="t1"
    client.post("/ivr/session", params={"call_id":call_id})
    res = client.post("/handle_key", params={"call_id":call_id,"Digits":1})
    assert "Cardiology" in res.json()["message"]

def test_confirm():
    call_id="t2"
    client.post("/ivr/session", params={"call_id":call_id})
    client.post("/handle_key", params={"call_id":call_id,"Digits":1})
    client.post("/handle_key", params={"call_id":call_id,"Digits":1})
    res = client.post("/handle_key", params={"call_id":call_id,"Digits":1})
    assert "confirmed" in res.json()["message"]