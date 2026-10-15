"""Refresh the API's static leadership roster from frontend reference content."""
import json
from pathlib import Path

from app.core.site_content import CONTENT_PATH
from app.models.schemas import LeadershipMember


def update_leadership():
    source = Path(__file__).resolve().parent.parent / 'frontend/src/assets/team/leader.json'
    leaders = json.loads(source.read_text(encoding='utf-8'))
    roster = [LeadershipMember(
        id=leader['id'], name=leader['name'], position=leader['designation'],
        chapter=leader['chapter'],
    ).model_dump() for leader in leaders]
    content = json.loads(CONTENT_PATH.read_text(encoding='utf-8'))
    content['leadership'] = roster
    CONTENT_PATH.write_text(json.dumps(content, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(f'Updated {len(roster)} leaders in {CONTENT_PATH}. Commit and redeploy to publish.')


if __name__ == '__main__':
    update_leadership()
