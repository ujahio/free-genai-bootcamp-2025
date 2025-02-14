import os
import sys
# Add the parent directory (backend-flask) to the system path so that routes can be imported.
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from flask import Flask
import sqlite3
from routes import load  # Now this should work as the parent directory is in sys.path

def create_app():
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.config['BASE_URL'] = 'http://localhost:5001'  # Add your base URL here

    # Setup an in-memory SQLite database for testing.
    conn = sqlite3.connect(":memory:")
    conn.row_factory = sqlite3.Row
    app.db = conn

    # Initialize the schema for testing.
    cursor = app.db.cursor()
    # Create the 'groups' table.
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            words_count INTEGER DEFAULT 0
        )
    """)
    # Create the 'study_activities' table.
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS study_activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            preview_url TEXT
        )
    """)
    # Create the 'study_sessions' table.
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS study_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            group_id INTEGER NOT NULL,
            study_activity_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (group_id) REFERENCES groups(id),
            FOREIGN KEY (study_activity_id) REFERENCES study_activities(id)
        )
    """)

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            kanji TEXT NOT NULL,
            romaji TEXT NOT NULL,
            english TEXT NOT NULL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS word_reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word_id INTEGER NOT NULL,
            study_session_id INTEGER NOT NULL,
            correct BOOLEAN NOT NULL,
            created_at TIMESTAMP NOT NULL,
            FOREIGN KEY (word_id) REFERENCES words (id),
            FOREIGN KEY (study_session_id) REFERENCES study_sessions (id)
        )
    ''')

    # Create the 'word_review_items' table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS word_review_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word_id INTEGER NOT NULL,
            correct BOOLEAN NOT NULL,
            study_session_id INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (word_id) REFERENCES words (id),
            FOREIGN KEY (study_session_id) REFERENCES study_sessions (id)
        )
    ''')
    
    app.db.commit()

    # Load routes into the application so endpoints are available.
    load(app)
    return app

@pytest.fixture
def app():
    # Use the create_app function which already has all the database setup
    app = create_app()
    
    yield app
    
    # Cleanup
    app.db.close()

@pytest.fixture
def client(app):
    return app.test_client() 