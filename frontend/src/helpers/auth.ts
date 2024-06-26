const API_BACKEND = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = `${API_BACKEND}/api/v1`;

import { getCookie, setCookie, deleteCookie } from "cookies-next";

function getCSRFCookie(name: string) {
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

export interface LoginPostData {
  username: string;
  password: string;
}

export interface RegisterPostData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export async function login(data: LoginPostData) {
  const csrftoken = getCSRFCookie("csrftoken")!;
  const response = await fetch(`${BASE_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  console.log(res);
  if (response.ok) {
    setCookie("accessToken", res.access);
  }
  return response.ok;
}

export async function logOut() {
  const csrftoken = getCSRFCookie("csrftoken")!;
  const data = await fetch(`${BASE_URL}/auth/logout/`, {
    method: "POST",
    cache: "no-store",
    credentials: "include",
    headers: { "X-CSRFToken": csrftoken },
  });
  const logoutData = await data.json();
  // if (data.ok) {
  //   deleteCookie("accessToken");
  // }
  return logoutData;
}

export async function register(data: RegisterPostData) {
  const response = await fetch(`${BASE_URL}/auth/registration/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.ok;
}
