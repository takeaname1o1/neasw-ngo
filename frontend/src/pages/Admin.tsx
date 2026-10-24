import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AdminError, adminRequest, downloadSubmissions } from '../services/admin';
import type { SubmissionPage } from '../services/admin';
import './Admin.css';

export function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<SubmissionPage | null>(null);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filters, setFilters] = useState({ search: '', date_from: '', date_to: '' });
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState('');
  const [exportStatus, setExportStatus] = useState('');
  const exportController = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const filterParams = new URLSearchParams(Object.entries(filters).filter(([, value]) => value)).toString();

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; exportController.current?.abort(); };
  }, []);

  function showLogin() {
    exportController.current?.abort();
    setExporting(false);
    setExportStatus('');
    setExportError('');
    setAuthenticated(false);
    setRecords(null);
    setPassword('');
    window.history.replaceState(null, '', '/admin/login');
  }

  useEffect(() => {
    let active = true;
    adminRequest<{ username: string }>('/session')
      .then(data => {
        if (!active) return;
        setUsername(data.username);
        setAuthenticated(true);
        window.history.replaceState(null, '', '/admin/submissions');
      })
      .catch(err => {
        if (!active) return;
        showLogin();
        if (!(err instanceof AdminError && err.status === 401)) setError(err.message || 'Unable to check session');
      })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    const controller = new AbortController();
    setLoading(true);
    setRecords(null);
    setError('');
    adminRequest<SubmissionPage>(`/submissions?page=${page}&${filterParams}`, { signal: controller.signal })
      .then(data => { if (!controller.signal.aborted) setRecords(data); })
      .catch(err => {
        if (controller.signal.aborted) return;
        if (err instanceof AdminError && err.status === 401) showLogin();
        setError(err.message || 'Unable to load submissions');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [authenticated, page, filterParams, refresh]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await adminRequest('/login', { method: 'POST', body: JSON.stringify({ username, password }) });
      setPassword('');
      setPage(1);
      setAuthenticated(true);
      window.history.replaceState(null, '', '/admin/submissions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
    } finally { setBusy(false); }
  }

  async function signOut() {
    exportController.current?.abort();
    setExportStatus('');
    setExporting(false);
    setBusy(true);
    setError('');
    try {
      await adminRequest('/logout', { method: 'POST' });
      showLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign out');
    } finally { setBusy(false); }
  }

  async function exportExcel() {
    if (exportController.current && !exportController.current.signal.aborted) return;
    const controller = new AbortController();
    exportController.current = controller;
    setExporting(true);
    setExportError('');
    setExportStatus('Preparing Excel…');
    try {
      await downloadSubmissions(filterParams, controller.signal);
      if (!controller.signal.aborted && mounted.current) setExportStatus('Excel download ready.');
    } catch (err) {
      if (controller.signal.aborted || !mounted.current) return;
      setExportStatus('');
      if (err instanceof AdminError && err.status === 401) {
        showLogin();
        setError(err.message);
      } else setExportError(err instanceof Error ? err.message : 'Unable to export submissions');
    } finally {
      if (!controller.signal.aborted && mounted.current) setExporting(false);
      if (exportController.current === controller) exportController.current = null;
    }
  }

  return <main className="admin-shell">
    <div className="admin-brand"><a href="/">NorthEast Association for Social Welfare</a><span>Administration</span></div>
    {checking ? <p role="status">Checking your session…</p> : !authenticated ?
      <section className="admin-login card-panel">
        <h1>Admin sign in</h1>
        <p>Sign in to view enquiries and volunteer applications.</p>
        <form onSubmit={signIn}>
          <label>Username<input required autoComplete="username" maxLength={256} value={username} onChange={e => setUsername(e.target.value)} /></label>
          <label>Password<input required type="password" autoComplete="current-password" maxLength={1024} value={password} onChange={e => setPassword(e.target.value)} /></label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="btn btn-accent" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </section> : <section>
        <div className="admin-heading"><div><h1>Submissions</h1><p>Signed in as {username}</p></div>
          <button className="btn btn-secondary" disabled={busy} onClick={signOut}>{busy ? 'Signing out…' : 'Sign out'}</button>
        </div>
        <form className="admin-search" onSubmit={e => { e.preventDefault(); setPage(1); setFilters({ search: search.trim(), date_from: dateFrom, date_to: dateTo }); setExportStatus(''); setExportError(''); setRefresh(v => v + 1); }}>
          <div className="admin-filter-fields">
            <label htmlFor="submission-search">Search submissions<input id="submission-search" type="search" placeholder="Name, email, phone, organisation or message" maxLength={200} value={search} onChange={e => setSearch(e.target.value)} /></label>
            <label htmlFor="submission-from">From date (UTC)<input id="submission-from" type="date" value={dateFrom} max={dateTo || '9999-12-30'} onChange={e => setDateFrom(e.target.value)} /></label>
            <label htmlFor="submission-to">To date (UTC)<input id="submission-to" type="date" value={dateTo} min={dateFrom} max="9999-12-30" onChange={e => setDateTo(e.target.value)} /></label>
          </div>
          <div className="admin-filter-actions">
            <button className="btn btn-accent" disabled={loading || busy}>Search</button>
            <button type="button" className="btn btn-secondary" disabled={loading || busy} onClick={() => setRefresh(v => v + 1)}>Refresh</button>
            <button type="button" className="btn btn-secondary" disabled={exporting || busy || loading} onClick={exportExcel}>{exporting ? 'Preparing Excel…' : 'Export Excel'}</button>
          </div>
          <p className="admin-export-hint">Exports all matching submissions for the applied filters, including other pages. Apply filter changes with Search.</p>
        </form>
        <p role="status" className="admin-export-status">{exportStatus}</p>
        {exportError && <p className="admin-error" role="alert">{exportError}</p>}
        {error && <p className="admin-error" role="alert">{error}</p>}
        {loading && <p role="status">Loading submissions…</p>}
        {records && <>
          <p className="admin-count" aria-live="polite">{records.total} {records.total === 1 ? 'submission' : 'submissions'}{filterParams ? ' matching your filters' : ''}</p>
          {records.items.length === 0 ? <div className="card-panel admin-empty">No submissions found.</div> :
            <div className="admin-records">{records.items.map(record => <article className="card-panel admin-record" key={record.id}>
              <div className="admin-record-heading"><h2>{record.name}</h2><span>#{record.id} · {record.created_at ? new Date(record.created_at).toLocaleString() : 'Date unavailable'}</span></div>
              <dl><div><dt>Email</dt><dd>{record.email}</dd></div><div><dt>Phone</dt><dd>{record.phone_number}</dd></div>
                <div><dt>Organisation / plan</dt><dd>{record.organization_name || '—'}</dd></div>
                <div><dt>Preferred date</dt><dd>{record.preferred_date || '—'}</dd></div></dl>
              <h3>Message</h3><div className="admin-message">{record.message}</div>
            </article>)}</div>}
          <nav className="admin-pagination" aria-label="Submission pages">
            <button className="btn btn-secondary" disabled={page <= 1 || loading} onClick={() => setPage(v => v - 1)}>Previous</button>
            <span>Page {page} of {Math.max(1, Math.ceil(records.total / records.page_size))}</span>
            <button className="btn btn-secondary" disabled={page * records.page_size >= records.total || loading} onClick={() => setPage(v => v + 1)}>Next</button>
          </nav>
        </>}
      </section>}
  </main>;
}
