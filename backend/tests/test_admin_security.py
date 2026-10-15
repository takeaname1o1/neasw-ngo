from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta
import unittest

from app.core.admin_security import AdminSecurityStore, AdminSession


class AdminSecurityStoreTests(unittest.TestCase):
    def test_concurrent_attempt_limit_is_atomic(self):
        store = AdminSecurityStore()
        current = datetime(2026, 10, 16)
        with ThreadPoolExecutor(max_workers=10) as pool:
            allowed = list(pool.map(lambda _: store.record_attempt('same-client', current), range(50)))
        self.assertEqual(sum(allowed), 5)
        self.assertTrue(store.record_attempt('same-client', current + timedelta(minutes=16)))

    def test_global_attempt_limit_is_preserved(self):
        store = AdminSecurityStore()
        current = datetime(2026, 10, 16)
        for number in range(30):
            self.assertTrue(store.record_attempt(f'client-{number}', current))
        self.assertFalse(store.record_attempt('another-client', current))

    def test_sessions_expire_and_memory_is_bounded(self):
        store = AdminSecurityStore()
        current = datetime(2026, 10, 16)
        for number in range(129):
            store.create_session(AdminSession(str(number), 'tag', current + timedelta(hours=1)), current)
        self.assertIsNone(store.get_session('0', current))
        self.assertIsNotNone(store.get_session('128', current))
        self.assertIsNone(store.get_session('128', current + timedelta(hours=2)))

    def test_new_login_revokes_previous_session(self):
        store = AdminSecurityStore()
        current = datetime(2026, 10, 16)
        store.create_session(AdminSession('old-token-hash', 'tag', current + timedelta(hours=1)), current)
        store.create_session(AdminSession('new-token-hash', 'tag', current + timedelta(hours=1)), current, 'old-token-hash')
        self.assertIsNone(store.get_session('old-token-hash', current))
        self.assertIsNotNone(store.get_session('new-token-hash', current))
