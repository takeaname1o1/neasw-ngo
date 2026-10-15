"""Database configuration checks; no connection to the Neon project is made."""
import os
import unittest
from unittest.mock import patch

from sqlalchemy import text
from app.core.config import BACKEND_DIR, Settings
from app.core.database import create_database_engine
from app.core import database


class DatabaseConfigurationTests(unittest.TestCase):
    def test_local_sqlite_default_has_stable_path(self):
        with patch.dict(os.environ):
            os.environ.pop("DATABASE_URL", None)
            settings = Settings(_env_file=None)
        self.assertEqual(settings.DATABASE_URL, f"sqlite:///{BACKEND_DIR / 'neasw.db'}")

    def test_sqlite_queries_still_work(self):
        engine = create_database_engine("sqlite:///:memory:")
        try:
            with engine.connect() as connection:
                self.assertEqual(connection.scalar(text("SELECT 1")), 1)
        finally:
            engine.dispose()

    def test_neon_urls_use_psycopg_and_keep_tls_options(self):
        for scheme in ("postgres", "postgresql", "postgresql+psycopg"):
            with self.subTest(scheme=scheme):
                engine = create_database_engine(
                    f"{scheme}://user:password@example.invalid/db?sslmode=require"
                )
                try:
                    self.assertEqual(engine.dialect.driver, "psycopg")
                    self.assertEqual(engine.url.query['sslmode'], 'require')
                    self.assertTrue(engine.pool._pre_ping)
                finally:
                    engine.dispose()

    def test_unsupported_database_is_rejected(self):
        with self.assertRaises(ValueError):
            create_database_engine("mysql://user:password@example.invalid/db")

    def test_sqlite_override_does_not_use_neon_schema_connection(self):
        engine = create_database_engine("sqlite:///:memory:")
        try:
            with (
                patch.object(database, "engine", engine),
                patch.object(database.settings, "DATABASE_URL_UNPOOLED",
                             "postgresql://user:password@example.invalid/db"),
                patch.object(database, "create_database_engine") as create_engine,
            ):
                database.initialize_database()
                create_engine.assert_not_called()
        finally:
            engine.dispose()


if __name__ == "__main__":
    unittest.main()
