export function LogList({ logs }) {
  return (
    <section className="panel log-panel">
      <h2>Logs</h2>
      {logs.length === 0 ? (
        <p>No logs loaded yet.</p>
      ) : (
        <div className="log-list">
          {logs.map((log) => (
            <article className="log-item" key={log.id}>
              <div>
                <strong>{log.level}</strong>
                <span>{log.package}</span>
              </div>
              <p>{log.message}</p>
              <small>{log.timestamp}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
