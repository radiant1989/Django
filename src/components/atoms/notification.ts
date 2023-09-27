import {
  createNotifier,
  NotificationGroup,
  defineNotificationComponent,
} from "@/libraries/notification";
import { warningIcon } from "~/icons";

export type NotificationSchema = {
  type: "error" | "warning" | "success" | "info"; // NOTE: only error is supported for now
  title: string;
  text: string;
  icon?: {
    class: string;
    href: string;
  }
};
const defaultTypeIconMap = {
  error: {
    href: warningIcon,
    class: 'w-[41px] h-[37px] text-ronil-color'
  },
  success: {
    href: warningIcon, // NOTE: this needs to be changed
    class: 'w-[41px] h-[37px] text-ronil-color'
  },
  warning: {
    href: warningIcon, // NOTE: this needs to be changed
    class: 'w-[41px] h-[37px] text-ronil-color'
  },
  info: {
    href: warningIcon, // NOTE: this needs to be changed
    class: 'w-[41px] h-[37px] text-ronil-color'
  },
}
export type UserNotification = NotificationSchema & {
  group?: "top-left";
};
export const doNotify = createNotifier<NotificationSchema>();
export const notify = {
  error: (schema: Omit<UserNotification, "type">, timeout?: number) =>
    doNotify({ group: "top-left", type: "error", icon: defaultTypeIconMap["error"], ...schema }, timeout || 3000),
  success: (schema: Omit<UserNotification, "type">, timeout?: number) =>
    doNotify(
      { group: "top-left", type: "success", icon: defaultTypeIconMap["success"], ...schema },
      timeout || 3000
    ),
  warning: (schema: Omit<UserNotification, "type">, timeout?: number) =>
    doNotify(
      { group: "top-left", type: "warning", icon: defaultTypeIconMap["warning"], ...schema },
      timeout || 3000
    ),
  info: (schema: Omit<UserNotification, "type">, timeout?: number) =>
    doNotify(
      { group: "top-left", type: "info", icon: defaultTypeIconMap["info"], ...schema },
      timeout || 3000
    ),
};
export const Notification = defineNotificationComponent<NotificationSchema>();
export { NotificationGroup };
