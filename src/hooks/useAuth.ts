import axios from "axios";
import { useEffect, useState } from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .get(process.env.API_URL + "/tasks", { withCredentials: true })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false));
  }, []);

  return authenticated;
}
