import { useState } from "react";
import { CredentialPanel } from "../component/CredentialPanel.jsx";
import { LogList } from "../component/LogList.jsx";
import { RegistrationForm } from "../component/RegistrationForm.jsx";
import { fetchLogs, sendLog } from "../api/logApi.js";
import { useRegistration } from "../hook/useRegistration.js";

export function RegistrationPage() {
  const registration = useRegistration();
  const [logs, setLogs] = useState([]);
  const [logMessage, setLogMessage] = useState("");

  async function loadLogs() {
    try {
      const loadedLogs = await fetchLogs();
      setLogs(loadedLogs);
      setLogMessage("Logs loaded.");
    } catch (error) {
      setLogMessage(error.response?.data?.message || "Login first to load logs.");
    }
  }

  async function createSampleLog() {
    try {
      await sendLog({
        stack: "backend",
        level: "error",
        package: "handler",
        message: "received string, expected bool"
      });
      await loadLogs();
    } catch (error) {
      setLogMessage(error.response?.data?.message || "Could not send sample log.");
    }
  }

  return (
    <main className="app-shell">
      <div className="content-grid">
        <RegistrationForm
          form={registration.form}
          loading={registration.loading}
          onChange={registration.handleChange}
          onSubmit={registration.handleSubmit}
        />

        <div className="side-stack">
          {registration.message && <p className="status">{registration.message}</p>}
          <CredentialPanel credentials={registration.credentials} />
          {registration.token && (
            <section className="panel">
              <h2>Bearer Token</h2>
              <textarea readOnly value={registration.token} rows={4} />
            </section>
          )}
          <section className="panel actions">
            <h2>Log Actions</h2>
            <button onClick={createSampleLog}>Send Sample Handler Error</button>
            <button className="secondary" onClick={loadLogs}>Refresh Logs</button>
            {logMessage && <p className="status">{logMessage}</p>}
          </section>
        </div>
      </div>

      <LogList logs={logs} />
    </main>
  );
}
