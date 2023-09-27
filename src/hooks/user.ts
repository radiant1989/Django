import { User } from "~/types";

export const getModalLinkForUser = (user: User) => {
  const url = new URL(location.href);
  url.searchParams.set("modal", "user");
  url.searchParams.set("name", user.username);
  const href = `${url.pathname}${url.search}`;
  return href;
};
