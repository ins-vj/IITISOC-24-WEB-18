const API_BACKEND = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = `${API_BACKEND}/api/v1`;

import { getCookie } from "cookies-next";

interface ApiCallOptions {
  method?: string;
  isAuth?: boolean;
  body?: object;
  next?: object;
  formData?: FormData;
}

export const apiCall = async (
  path: string,
  {
    method = "GET",
    isAuth = true,
    body = null,
    formData = null,
    next = null,
  }: ApiCallOptions = {}
) => {
  const accessToken = getCookie("accessToken");
  if (!accessToken && isAuth) {
    window.location.href = "/login";
    return;
  }

  let requestUrl = `${BASE_URL}${path}/`;
  const csrftoken = getCSRFCookie("csrftoken")!;

  const headers: HeadersInit = {};

  const req = {
    method: method,
  };

  if ((method == "POST" || method == "PATCH") && body) {
    req["body"] = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }
  if ((method == "POST" || method == "PATCH") && formData) {
    req["body"] = formData;
    headers["accept"] = "application/json";
  }
  if (method == "DELETE") {
    headers["accept"] = "application/json";
  }

  if (isAuth) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  headers["X-CSRFToken"] = csrftoken;

  req["headers"] = headers;

  if (next) {
    req["next"] = next;
  }

  const res = await fetch(requestUrl, req);
  if (method!="DELETE") {
  return res.json();}
};

function getCSRFCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

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
  const csrftoken = getCSRFCookie("csrftoken")!;
  const accessToken = getCookie("accessToken");
  console.log(accessToken);
  const data = await fetch(`${BASE_URL}/auth/user/`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userData = await data.json();
  return userData;
}
export const fetchFriendRequests = async () => {
  return apiCall("/user/friend-requests",{method: "GET"});
}
export const updateFriendRequest = async (id: string, status: string) => {
  return apiCall(`/user/friend-requests/${id}/update`, {
    method: "PATCH",
    body: { currentStatus: status },
  });
}
export const fetchRequestedUser = async (userName:string) => {

  return apiCall(`/user/user/${userName}`);

}
export const fetchSelfDetails = async () => {
  return apiCall(`/user/user-details`);
}
export const sendFriendRequest = async (id: string) => {  
  return apiCall(`/user/friend-requests`, {
    method: "POST",
    body: { to_user: id },
  });
}

export const createMeeting = async (ids: [string], privateMeet: boolean) =>{

  await apiCall("/meeting/meet-create", {
    method: "POST",
    body:{
      private: privateMeet,
      invited_users: ids
    }
    
  }).then((data) => {window.location.href = `/call/${data.id}`});

}
export const deleteFriendRequest = async (id: string) => {
  return apiCall(`/user/friend-requests/${id}`, {
    method: "DELETE",
  });
}
export const createCustomMeeting = async (ids: string[], privateMeet: boolean, time:string) =>{

  await apiCall("/meeting/meet-create", {
    method: "POST",
    body:{
      private: privateMeet,
      invited_users: ids,
      scheduled_at: time
    }
    
  }).then((data) => {window.location.href = `/call/${data.id}`});

}

export const createMeet = async ( privateMeet: boolean) =>{
var ids:string;
await apiCall("/user/user-details").then((data) => {ids = data.id});
console.log(ids);
  await apiCall("/meeting/meet-create", {
    method: "POST",
    body:{
      invited_users: [ids,ids],
      private: privateMeet
    }
    
  }).then((data) => {window.location.href = `/call/${data.id}`});
}

export async function getMeetDetails(meetId: string) {
  return apiCall(`/meeting/meet-detail/${meetId}`);
}
