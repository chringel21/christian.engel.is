import type { Context } from "@netlify/functions";
import fetch from "node-fetch";
import { getCookie } from "./util/auth";

const API_BASE_URL = process.env.API_BASE_URL;
interface ApiResponse {
  accessToken: string;
  refreshToken: string;
}

export default async (req: Request, context: Context) => {
  const params = new URLSearchParams(await req.text());
  const email = params.get("email");
  const password = params.get("password");
  if (!email || !password) {
    return new Response("Email and password required", { status: 401 });
  }

  const loginResponse = await fetch(`${API_BASE_URL}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (loginResponse.status !== 200) {
    throw new Error(`Error ${await loginResponse.text()}`);
  }

  const { accessToken, refreshToken } =
    (await loginResponse.json()) as ApiResponse;

  return new Response("Authorized", {
    status: 302,
    headers: {
      Location: "/new/",
      "Cache-Control": "no-cache", // Disable caching of this response
      "Set-Cookie": getCookie("auth-accessToken", accessToken, 60 * 5),
    },
  });
};
