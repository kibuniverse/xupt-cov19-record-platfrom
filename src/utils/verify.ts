export const verifyUserName = (username: string) => username?.length <= 20;
export const verifyPassword = (password: string) => password?.length <= 20;
export const verifyPhone = (phone: string) => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
};
