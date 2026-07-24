import json
import sqlite3
import os

def update_leadership():
    db_path = os.path.join(os.path.dirname(__file__), 'neasw.db')
    json_path = os.path.join(os.path.dirname(__file__), '../frontend/src/assets/team/leader.json')
    
    print(f"Connecting to database at {db_path}...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 1. Clear existing leadership table
    print("Clearing existing leadership_members table...")
    cursor.execute("DELETE FROM leadership_members")
    
    # 2. Read leader.json
    print(f"Reading leaders from {json_path}...")
    with open(json_path, 'r', encoding='utf-8') as f:
        leaders = json.load(f)
        
    # 3. Insert each leader
    print(f"Inserting {len(leaders)} leaders...")
    for l in leaders:
        cursor.execute(
            "INSERT INTO leadership_members (id, name, position, chapter) VALUES (?, ?, ?, ?)",
            (l['id'], l['name'], l['designation'], l['chapter'])
        )
        
    conn.commit()
    conn.close()
    print("Database updated successfully!")

if __name__ == '__main__':
    update_leadership()
