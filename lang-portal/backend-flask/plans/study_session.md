# Implementation Plan for POST `/api/study-sessions` Endpoint

This document outlines the step-by-step plan for implementing the POST `/api/study-sessions` route. The purpose of this endpoint is to create a new study session record in the database.

## Overview

- **Route:** `/api/study-sessions`
- **HTTP Method:** POST
- **Functionality:** Validate input data, insert a new study session into the database, and return the newly created record with a status code of 201.

## Steps

- [x] **Step 1: Review Database Schema**

  - [x] Confirm the fields in the `study_sessions` table (e.g., `id`, `group_id`, `study_activity_id`, `created_at`, etc.).
  - [x] Identify required fields and any default values (e.g., auto-generated `id` and timestamp).

- [x] **Step 2: Create the Route**
  - [x] In your Flask application file, add a new route for POST requests:
    ```python
    @app.route('/api/study-sessions', methods=['POST'])
    @cross_origin()
    def create_study_session():
        # Implementation will go here
    ```
- [x] **Step 3: Retrieve and Validate Input Data**

  - [x] Use `request.get_json()` to obtain the JSON payload from the client.
  - [x] Ensure that the necessary fields (e.g., `group_id` and `study_activity_id`) are present in the payload.
  - [x] Validate that these fields are of the expected types (for example, integers).
  - [x] If any required field is missing or invalid, return a JSON error response with a `400 Bad Request` status.
    ```python
    data = request.get_json()
    if not data or 'group_id' not in data or 'study_activity_id' not in data:
        return jsonify({"error": "Missing required fields"}), 400
    ```

- [x] **Step 4: Insert the New Study Session into the Database**
  - [x] Get a database cursor from `app.db`.
  - [x] Prepare an INSERT statement to add a new study session record.
  - [x] Use the current datetime for the `created_at` field (e.g., `datetime.now()`).
  - [x] Execute the INSERT statement and commit the transaction.
    ```python
    try:
        cursor = app.db.cursor()
        created_at = datetime.now()
        cursor.execute(
            '''
            INSERT INTO study_sessions (group_id, study_activity_id, created_at)
            VALUES (?, ?, ?)
            ''',
            (data['group_id'], data['study_activity_id'], created_at)
        )
        app.db.commit()
    ```
- [x] **Step 5: Retrieve the Newly Created Record**
  - [x] Obtain the newly inserted study session's ID (using `cursor.lastrowid` or similar).
  - [x] Optionally, perform a SELECT query to retrieve the complete record for a detailed response.
    ```python
        new_session_id = cursor.lastrowid
        cursor.execute(
            '''
            SELECT ss.id, ss.group_id, g.name as group_name,
                   sa.id as activity_id, sa.name as activity_name,
                   ss.created_at, ss.created_at as end_time
            FROM study_sessions ss
            JOIN groups g ON g.id = ss.group_id
            JOIN study_activities sa ON sa.id = ss.study_activity_id
            WHERE ss.id = ?
            ''',
            (new_session_id,)
        )
        new_session = cursor.fetchone()
    ```
- [x] **Step 6: Return a Successful Response**
  - [x] Format and return a JSON response containing the new study session data.
  - [x] Use HTTP status code `201 Created`.
    ```python
        return jsonify({
            'id': new_session['id'],
            'group_id': new_session['group_id'],
            'group_name': new_session['group_name'],
            'activity_id': new_session['activity_id'],
            'activity_name': new_session['activity_name'],
            'start_time': new_session['created_at'],
            'end_time': new_session['end_time']
        }), 201
    ```
- [x] **Step 7: Add Error Handling**

  - [x] Wrap the database operations in a `try-except` block.
  - [x] In case of exceptions, return a JSON error message with HTTP status `500 Internal Server Error`.
    ```python
    except Exception as e:
        app.db.rollback()
        return jsonify({"error": str(e)}), 500
    ```

- [ ] **Step 8: Write Tests for the Endpoint**

  - [ ] **Test Valid Input:** Write a test that sends a valid JSON payload and asserts that:
    - The response status code is `201`.
    - The response JSON contains the expected fields (e.g., `id`, `group_id`, `activity_id`, etc.).
  - [ ] **Test Missing Fields:** Write tests that send invalid payloads (e.g., missing `group_id` or `study_activity_id`) and assert that the response status code is `400` and an error message is returned.
  - [ ] **Example Test Code Using pytest and Flask's Test Client:**

    ```python
    def test_create_study_session_success(client):
        data = {
            "group_id": 1,
            "study_activity_id": 2
        }
        response = client.post('/api/study-sessions', json=data)
        assert response.status_code == 201
        json_data = response.get_json()
        assert "id" in json_data
        assert json_data["group_id"] == data["group_id"]
        assert json_data["activity_id"] == data["study_activity_id"]

    def test_create_study_session_missing_field(client):
        data = {
            "group_id": 1
            # Missing study_activity_id
        }
        response = client.post('/api/study-sessions', json=data)
        assert response.status_code == 400
        json_data = response.get_json()
        assert "error" in json_data
    ```

## Final Review

- [ ] **Review Code:** Ensure that all new code follows the project's style guidelines.
- [ ] **Peer Review:** Have a peer or mentor review your implementation.
- [ ] **Run All Tests:** Verify that all tests pass, including both unit and integration tests.

By following these steps, you will create a robust and well-tested POST `/api/study-sessions` endpoint.
