import sqlite3
import os

try:
    # Create database
    db_path = 'database.db'
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Read and execute all SQL files in the setup directory
    sql_dir = 'sql/setup'
    for filename in sorted(os.listdir(sql_dir)):
        if filename.endswith('.sql'):
            with open(os.path.join(sql_dir, filename)) as f:
                cursor.execute(f.read())
                conn.commit()

    print(f"Database initialized at {db_path}")

except Exception as e:
    print(f"Error initializing database: {str(e)}")
finally:
    if 'conn' in locals():
        conn.close() 