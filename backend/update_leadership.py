import json
from pathlib import Path
from app.core.database import SessionLocal
from app.models.db_models import LeadershipMember

def update_leadership():
    json_path = Path(__file__).resolve().parent.parent / 'frontend/src/assets/team/leader.json'
    print(f"Reading leaders from {json_path}...")
    with open(json_path, 'r', encoding='utf-8') as f:
        leaders = json.load(f)

    # Use the configured database (Neon or local SQLite), in one transaction.
    with SessionLocal.begin() as db:
        db.query(LeadershipMember).delete()
        db.add_all([
            LeadershipMember(
                id=leader['id'], name=leader['name'],
                position=leader['designation'], chapter=leader['chapter']
            )
            for leader in leaders
        ])
    print(f"Replaced {len(leaders)} leaders in the configured database.")

if __name__ == '__main__':
    update_leadership()
