from flask import jsonify
from flask_cors import cross_origin
import sqlite3

def load(app):
    @app.route('/api/reset_history', methods=['POST'])
    @cross_origin()
    def reset_history():
        try:
            cursor = app.db.cursor()
            
            # Delete all word review items first (due to foreign key constraint)
            cursor.execute('DELETE FROM word_review_items')
            
            # Delete all study sessions
            cursor.execute('DELETE FROM study_sessions')
            
            # Reset the SQLite sequence counter for these tables
            cursor.execute("DELETE FROM sqlite_sequence WHERE name IN ('word_review_items', 'study_sessions')")
            
            # Commit the changes
            app.db.get().commit()
            
            return jsonify({"message": "Study history has been reset successfully"})
            
        except Exception as e:
            # Rollback in case of error
            app.db.get().rollback()
            return jsonify({"error": str(e)}), 500

    @app.route('/api/full_reset', methods=['POST'])
    @cross_origin()
    def full_reset():
        try:
            cursor = app.db.cursor()
            
            # Drop all tables
            cursor.execute('PRAGMA foreign_keys = OFF')
            tables = cursor.execute('''
                SELECT name FROM sqlite_master 
                WHERE type='table' AND name NOT LIKE 'sqlite_%'
            ''').fetchall()
            
            for table in tables:
                cursor.execute(f'DROP TABLE IF EXISTS {table[0]}')
            
            # Re-initialize the database using the same setup as init
            app.db.setup_tables(cursor)
            
            # Re-seed the data
            app.db.import_word_json(
                cursor=cursor,
                group_name='Core Verbs',
                data_json_path='seed/data_verbs.json'
            )
            app.db.import_word_json(
                cursor=cursor,
                group_name='Core Adjectives',
                data_json_path='seed/data_adjectives.json'
            )
            app.db.import_study_activities_json(
                cursor=cursor,
                data_json_path='seed/study_activities.json'
            )
            
            cursor.execute('PRAGMA foreign_keys = ON')
            
            # Commit the changes
            app.db.get().commit()
            
            return jsonify({"message": "Database has been reset and reseeded successfully"})
            
        except Exception as e:
            # Rollback in case of error
            app.db.get().rollback()
            return jsonify({"error": str(e)}), 500 