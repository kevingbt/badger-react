export default function useFetchApi() {
  const token = localStorage.getItem("token");
  return async function (method: string, endpoint: string, body?: any) {
    let payload;
    if (endpoint === "login") {
      payload = {
        method: method,
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(body),
      };
    } else {
      payload = {
        method: method,
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
    }

    const res = await fetch(
      `https://badger.arcplex.dev/api/v2/${endpoint}`,
      payload,
    );
    if (res.status === 204) {
      return;
    }
    const data = await res.json();
    if (!res.ok) {
      const errorMessages = Object.entries(data).map(([key, value]) => {
        return `${key}: ${value}`;
      });
      throw new Error(
        errorMessages.length > 0
          ? errorMessages.join(", ")
          : `Erreur HTTP : ${res.status}`,
      );
    }
    return data;
  };
}
