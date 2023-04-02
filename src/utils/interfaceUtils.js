
export const getUserAvatarUri = (username) => {

  return `https://api.dicebear.com/6.x/thumbs/png?seed=${username}`;
}