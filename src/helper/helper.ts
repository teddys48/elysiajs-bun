export const generateRandomString = () => {};

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
