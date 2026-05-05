import { jwtDecode } from "jwt-decode";
import { CognitoJwtPayload } from "../store/auth";

export function isTokenValid(token: string) {
  try {
    const decoded = jwtDecode<CognitoJwtPayload>(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}
