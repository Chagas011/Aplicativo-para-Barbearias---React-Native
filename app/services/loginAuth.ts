import { httpClient } from "./htppClient";

interface LoginParams {
  email: string;
  password: string;
}

interface AccessToken {
  accessToken: string;
}

export const login = async (dataParams: LoginParams) => {
  const { data } = await httpClient.post<AccessToken>(
    "/auth/sign-in",
    dataParams,
  );

  return { data };
};
