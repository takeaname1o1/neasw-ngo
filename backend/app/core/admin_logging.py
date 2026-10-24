"""Do not put private admin search filters into Uvicorn's access logs."""
import logging


class AdminAccessFilter(logging.Filter):
    def filter(self, record):
        # Uvicorn access records: client, method, path/query, HTTP version, status.
        if isinstance(record.args, tuple) and len(record.args) == 5:
            path = record.args[2]
            if isinstance(path, str) and path.partition('?')[0].startswith('/api/admin/'):
                record.args = (*record.args[:2], path.partition('?')[0], *record.args[3:])
        return True


def configure_admin_logging():
    logger = logging.getLogger('uvicorn.access')
    if not any(isinstance(item, AdminAccessFilter) for item in logger.filters):
        logger.addFilter(AdminAccessFilter())
