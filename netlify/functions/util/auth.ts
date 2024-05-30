import cookie, { CookieSerializeOptions } from "cookie";

export function getCookie(name: string, value: string, expiration: number) {
  let options = {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: expiration,
  } as CookieSerializeOptions;

  return cookie.serialize(name, value, options);
}
