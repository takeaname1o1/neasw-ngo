"""Bounded, process-local admin sessions and login throttling.

Run one API worker. Sessions and attempt counters reset on process restart;
application submissions remain durable in PostgreSQL.
"""
from collections import deque
from dataclasses import dataclass
from datetime import datetime, timedelta
from threading import Lock


@dataclass(frozen=True)
class AdminSession:
    token_hash: str
    credential_tag: str
    expires_at: datetime


class AdminSecurityStore:
    def __init__(self):
        self._lock = Lock()
        self._sessions: dict[str, AdminSession] = {}
        self._attempts: deque[tuple[str, datetime]] = deque()

    def record_attempt(self, client_hash: str, current: datetime) -> bool:
        with self._lock:
            cutoff = current - timedelta(minutes=15)
            while self._attempts and self._attempts[0][1] < cutoff:
                self._attempts.popleft()
            if (len(self._attempts) >= 30
                    or sum(client == client_hash for client, _ in self._attempts) >= 5):
                return False
            self._attempts.append((client_hash, current))
            return True

    def create_session(self, session: AdminSession, current: datetime, previous_hash: str | None = None):
        with self._lock:
            self._sessions = {key: value for key, value in self._sessions.items()
                              if value.expires_at > current}
            if previous_hash:
                self._sessions.pop(previous_hash, None)
            # Bound memory even if valid credentials are repeatedly used.
            while len(self._sessions) >= 128:
                self._sessions.pop(next(iter(self._sessions)))
            self._sessions[session.token_hash] = session

    def get_session(self, token_hash: str, current: datetime) -> AdminSession | None:
        with self._lock:
            session = self._sessions.get(token_hash)
            if session and session.expires_at <= current:
                self._sessions.pop(token_hash, None)
                return None
            return session

    def revoke_session(self, token_hash: str):
        with self._lock:
            self._sessions.pop(token_hash, None)

    def clear(self):
        with self._lock:
            self._sessions.clear()
            self._attempts.clear()


admin_security = AdminSecurityStore()
