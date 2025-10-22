import { v7 } from "uuid";

export const generateRandomString = () => {
  return v7().split("-").join("");
};

interface BuildResponse {
  code: number;
  message: string;
  data: any;
}

export const buildResponse = (code: number, message: string, data: any) => {
  return {
    code: code,
    message: message,
    data: data,
  } as BuildResponse;
};
