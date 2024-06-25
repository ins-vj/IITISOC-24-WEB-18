const API_BACKEND = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = `${API_BACKEND}/api/v1`;

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export interface UserDetailsFC {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export async function getUserDetails() {
  const csrftoken = getCookie("csrftoken")!;
  const data = await fetch(`${BASE_URL}/auth/user/`, {
    cache: "no-store",
    credentials: "include",
    headers: { "Content-Type": "application/json", "X-CSRFToken": csrftoken },
  });
  const userData: UserDetailsFC = await data.json();
  return userData;
}
