import pytest
from datetime import datetime

def test_create_word_review(client, app, url='http://localhost:5001'):
    if url is None:
        url = app.config.get('BASE_URL', 'http://example.com')
    # Setup: Create necessary data
    cursor = app.db.cursor()
    try:
        # Create a study group with required words_count field
        cursor.execute('''
            INSERT INTO groups (name, words_count) VALUES (?, ?)
        ''', ('Test Group', 0))
        group_id = cursor.lastrowid

        # Create a study activity with required preview_url field
        cursor.execute('''
            INSERT INTO study_activities (name, url, preview_url) VALUES (?, ?, ?)
        ''', ('Test Activity', url, None))
        activity_id = cursor.lastrowid

        # Create a study session with properly formatted datetime
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        cursor.execute('''
            INSERT INTO study_sessions (group_id, study_activity_id, created_at)
            VALUES (?, ?, ?)
        ''', (group_id, activity_id, current_time))
        session_id = cursor.lastrowid

        # Create a word
        cursor.execute('''
            INSERT INTO words (kanji, romaji, english)
            VALUES (?, ?, ?)
        ''', ('犬', 'inu', 'dog'))
        word_id = cursor.lastrowid

        app.db.commit()
    finally:
        cursor.close()

    # Test case 1: Successful review creation
    response = client.post(
        f'/api/study-sessions/{session_id}/words/{word_id}/review',
        json={'correct': True}
    )
    
    # Debug output
    print(f"Response Status: {response.status_code}")
    print(f"Response Data: {response.get_data(as_text=True)}")
    
    assert response.status_code == 201
    data = response.get_json()
    assert data['word_id'] == word_id
    assert data['study_session_id'] == session_id
    assert data['correct'] is True
    assert 'created_at' in data

    # Test case 2: Missing correct field
    response = client.post(
        f'/api/study-sessions/{session_id}/words/{word_id}/review',
        json={}
    )
    assert response.status_code == 400
    assert response.get_json()['error'] == "Missing required field 'correct'"

    # Test case 3: Invalid correct field type
    response = client.post(
        f'/api/study-sessions/{session_id}/words/{word_id}/review',
        json={'correct': 'not_a_boolean'}
    )
    assert response.status_code == 400
    assert response.get_json()['error'] == "Field 'correct' must be a boolean"

    # Test case 4: Non-existent session
    response = client.post(
        f'/api/study-sessions/99999/words/{word_id}/review',
        json={'correct': True}
    )
    assert response.status_code == 404
    assert response.get_json()['error'] == "Study session not found"

    # Test case 5: Non-existent word
    response = client.post(
        f'/api/study-sessions/{session_id}/words/99999/review',
        json={'correct': True}
    )
    assert response.status_code == 404
    assert response.get_json()['error'] == "Word not found"