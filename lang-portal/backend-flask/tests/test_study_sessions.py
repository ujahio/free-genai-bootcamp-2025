import pytest
from datetime import datetime

# Helper functions to insert test records for groups and study_activities.
def insert_group(app, name="Test Group"):
    cursor = app.db.cursor()
    # Assuming the 'groups' table has at least 'id' and 'name' columns.
    cursor.execute("INSERT INTO groups (name) VALUES (?)", (name,))
    app.db.commit()
    return cursor.lastrowid

def insert_study_activity(app, name="Test Activity", url=None):
    if url is None:
        # Use the BASE_URL from the app configuration, or a fallback if not set.
        url = app.config.get('BASE_URL', 'http://example.com')
    cursor = app.db.cursor()
    # Assuming the 'study_activities' table has at least 'url' and 'name' columns.
    cursor.execute("INSERT INTO study_activities (name, url) VALUES (?, ?)", (name, url))
    app.db.commit()
    return cursor.lastrowid

def test_create_study_session_success(client):
    app = client.application
    print(app)

    # Insert required records for foreign key constraints.
    group_id = insert_group(app)
    study_activity_id = insert_study_activity(app)

    data = {
        "group_id": group_id,
        "study_activity_id": study_activity_id
    }

    response = client.post("/api/study-sessions", json=data)
    assert response.status_code == 201, "Expected status code 201 for a successful creation"
    
    resp_json = response.get_json()
    # Check that the required fields are present in the response
    assert "id" in resp_json, "Response should include the created study session id"
    assert resp_json["group_id"] == group_id, "Response group_id should match the inserted group_id"
    # Note: The endpoint returns 'activity_id' for study_activity_id
    assert resp_json["activity_id"] == study_activity_id, "Response activity_id should match the inserted study_activity_id"
    assert "group_name" in resp_json, "Response should include group_name"
    assert "activity_name" in resp_json, "Response should include activity_name"
    assert "start_time" in resp_json, "Response should include start_time"
    assert "end_time" in resp_json, "Response should include end_time"
    # Make sure the review_items_count starts at 0
    assert resp_json.get("review_items_count") == 0, "New study session should have 0 review_items"

def test_create_study_session_missing_field(client):
    # Here, the payload is missing 'study_activity_id'.
    data = {
       "group_id": 1
    }
    response = client.post("/api/study-sessions", json=data)
    assert response.status_code == 400, "Expected 400 Bad Request when required fields are missing"
    
    resp_json = response.get_json()
    assert "error" in resp_json, "Response should have an error message for missing fields" 