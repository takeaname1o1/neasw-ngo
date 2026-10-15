import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { AdminError, adminRequest } from '../services/admin';
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
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);

  function showLogin() {
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
    adminRequest<SubmissionPage>(`/submissions?page=${page}&search=${encodeURIComponent(query)}`, { signal: controller.signal })
      .then(setRecords)
      .catch(err => {
        if (controller.signal.aborted) return;
        if (err instanceof AdminError && err.status === 401) showLogin();
        setError(err.message || 'Unable to load submissions');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [authenticated, page, query, refresh]);

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
    setBusy(true);
    setError('');
    try {
      await adminRequest('/logout', { method: 'POST' });
      showLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign out');
    } finally { setBusy(false); }
  }

  return <main className="admin-shell">
    <div className="admin-brand"><a href="/">NEASW Welfare Foundation</a><span>Administration</span></div>
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
        <form className="admin-search" onSubmit={e => { e.preventDefault(); setPage(1); setQuery(search.trim()); setRefresh(v => v + 1); }}>
          <label htmlFor="submission-search">Search submissions</label>
          <div><input id="submission-search" type="search" placeholder="Name, email, phone, organisation or message" maxLength={200} value={search} onChange={e => setSearch(e.target.value)} />
            <button className="btn btn-accent" disabled={loading}>Search</button>
            <button type="button" className="btn btn-secondary" disabled={loading} onClick={() => setRefresh(v => v + 1)}>Refresh</button></div>
        </form>
        {error && <p className="admin-error" role="alert">{error}</p>}
        {loading && <p role="status">Loading submissions…</p>}
        {records && <>
          <p className="admin-count" aria-live="polite">{records.total} {records.total === 1 ? 'submission' : 'submissions'}{query ? ' matching your search' : ''}</p>
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
