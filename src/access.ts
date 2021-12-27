/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserInfo | undefined }) {
  const { currentUser } = initialState || {};
  console.log('currentUser', currentUser);
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canCreateUser: currentUser && currentUser?.role === 1,
  };
}
