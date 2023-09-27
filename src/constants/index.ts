export const [
  CREATE_USER,
  LOGIN,
  LOGOUT,
  FINISH_REGISTRATION,
  NEEDS_MERGE,
  TWOFA,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
] = [
  "create_user",
  "login",
  "logout",
  "finish_registration",
  "needs_merge",
  "towfa",
  "forgot_password",
  "reset_password",
] as const;
export * from "./symbols";
export * from "./micro-constants";
export * from "./errors";
export const [WAITING_PLAY, FUN_PLAY, REAL_PLAY] = ["PENDING_PLAY", "FUN_PLAY", "REAL_PLAY"] as const;

export const [
  OPENED_SIDEBAR_WIDTH,
  CLOSED_SIDEBAR_WIDTH,
  MOBILE_SIDEBAR_WIDTH,
] = ["240px", "60px", "100%"] as const;
