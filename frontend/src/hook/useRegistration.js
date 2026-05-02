import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi.js";
import { setCredentials, setToken } from "../state/authStore.js";

const initialForm = {
  email: "",
  name: "",
  rollNo: "",
  accessCode: ""
};

export function useRegistration() {
  const [form, setForm] = useState(initialForm);
  const [credentials, updateCredentials] = useState({ clientID: "", clientSecret: "" });
  const [token, updateToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const registration = await registerUser(form);
      const nextCredentials = {
        clientID: registration.clientID,
        clientSecret: registration.clientSecret
      };

      setCredentials(nextCredentials);
      updateCredentials(nextCredentials);

      const login = await loginUser(nextCredentials);
      setToken(login.token);
      updateToken(login.token);
      setMessage("Registration complete. Bearer token generated.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    credentials,
    token,
    message,
    loading,
    handleChange,
    handleSubmit
  };
}
