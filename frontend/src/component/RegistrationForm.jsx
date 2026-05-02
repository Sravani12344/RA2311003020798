export function RegistrationForm({ form, onChange, onSubmit, loading }) {
  return (
    <form className="panel form" onSubmit={onSubmit}>
      <h1>Logging System</h1>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={onChange} required />
      </label>
      <label>
        Name
        <input name="name" value={form.name} onChange={onChange} required />
      </label>
      <label>
        Roll No
        <input name="rollNo" value={form.rollNo} onChange={onChange} required />
      </label>
      <label>
        Access Code
        <input name="accessCode" value={form.accessCode} onChange={onChange} required />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
