export function CredentialPanel({ credentials }) {
  if (!credentials.clientID || !credentials.clientSecret) {
    return null;
  }

  return (
    <section className="panel">
      <h2>Client Credentials</h2>
      <p>Use these credentials to login and generate your Bearer token.</p>
      <label>
        Client ID
        <input readOnly value={credentials.clientID} />
      </label>
      <label>
        Client Secret
        <input readOnly value={credentials.clientSecret} />
      </label>
    </section>
  );
}
