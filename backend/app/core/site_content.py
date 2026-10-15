"""Version-controlled public website content, independent of the database."""
import json
from functools import lru_cache
from pathlib import Path

from app.models.schemas import LeadershipMember, VolunteerPlan

CONTENT_PATH = Path(__file__).resolve().parents[1] / "data" / "site_content.json"


@lru_cache(maxsize=1)
def load_site_content():
    content = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    return {
        "leadership": [LeadershipMember.model_validate(row) for row in content["leadership"]],
        "volunteer_plans": [VolunteerPlan.model_validate(row) for row in content["volunteer_plans"]],
    }
