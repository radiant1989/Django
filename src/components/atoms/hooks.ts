// Here is place where we can share key types and constants, which are used in atom components

import { computed, ComputedRef } from "vue";

// Button
export type ButtonStyleType =
  | "primary-lg"
  | "secondary-lg"
  | "primary"
  | "secondary"
  | "secondary-soft"
  | "secondary-control"
  | "third"
  | "danger"
  | "plain"
  | "size-md"
  | "transparent"
  | "primary-sm"
  | "primary-shadow-sm"
  | "secondary-sm"
  | "secondary-shadow-sm"
  | "third-sm"
  | "tab-secondary-sm"
  | "tab-primary-sm";
export const useButton = (
  props: {
    styleType?: ButtonStyleType;
  } = {}
): {
  typeClass: ComputedRef<string>;
  typeClassMap: {
    [key in ButtonStyleType]: string;
  };
} => {
  const typeClassMap = {
    "primary-lg":
      "h-[45px] md:h-[50px] bg-primary-gradient border-2 border-solid border-primary-color rounded-[12px] text-white text-lg font-bold text-center hover:bg-primary-hover-gradient hover:border-primary-hover-color",
    "secondary-lg":
      "h-[45px] md:h-[50px] bg-secondary-gradient border-2 border-solid border-secondary-color rounded-lg text-white text-sm md:text-base font-bold text-center hover:bg-secondary-hover-gradient hover:border-secondary-hover-color py-[11px] md:py-[13px] px-4 md:px-5",
    primary:
      "h-10 md:h-[45px] bg-primary-gradient border-2 border-solid border-primary-color rounded-lg text-white text-sm md:text-base font-semibold text-center hover:bg-primary-hover-gradient hover:border-primary-hover-color py-[11px] md:py-[13px] px-4 md:px-5",
    secondary:
      "h-10 md:h-[45px] bg-secondary-gradient border-2 border-solid border-secondary-color rounded-lg text-white text-sm md:text-base font-semibold text-center hover:bg-secondary-hover-gradient hover:border-secondary-hover-color py-[11px] md:py-[13px] px-4 md:px-5",
    "secondary-control":
      "h-[30px] md:h-[33px] bg-secondary-gradient rounded-sm text-steel-color text-sm md:text-base font-medium text-center [&:not(:disabled)]:hover:bg-secondary-hover-gradient p-1 disabled:opacity-70 border-t border-solid border-secondary-color",
    "secondary-soft":
      "h-10 md:h-[45px] bg-secondary-gradient rounded-lg text-steel-color hover:text-white text-sm md:text-base font-semibold text-center hover:bg-secondary-hover-gradient py-3 sm:py-[13px] px-5",
    third:
      "h-10 md:h-[45px] bg-third-gradient  border-2 border-solid border-third-color rounded-lg text-white text-sm md:text-base font-semibold text-center hover:bg-third-hover-gradient hover:border-third-hover-color py-[11px] md:py-[13px] px-4 md:px-5",
    danger:
      "h-10 md:h-[45px] bg-danger-gradient border-2 border-solid border-danger-color rounded-lg text-white text-sm md:text-base font-semibold text-center hover:bg-danger-hover-gradient hover:border-danger-hover-color py-[11px] md:py-[13px] px-4 md:px-5",
    plain:
      "h-10 md:h-[45px] border-solid border-primary-color rounded-lg text-sm md:text-base font-semibold text-center py-[13px] md:py-[15px] px-4 md:px-5",
    "size-md":
      "h-10 md:h-[45px] rounded-lg text-sm md:text-base font-semibold text-center py-[13px] md:py-[15px] px-4 md:px-5",
    transparent:
      "bg-opacity-0 border-none text-steel-color text-sm md:text-base font-semibold text-center hover:text-white",
    "primary-sm":
      "h-5 md:h-[30px] bg-primary-gradient rounded-lg text-white text-sm font-medium text-center py-1 md:py-1.5 px-1 md:px-2 ",
    "primary-shadow-sm":
      "h-5 md:h-[30px] bg-primary-gradient rounded-lg text-white text-xs md:text-sm font-medium text-center shadow-primary-inset py-0.5 md:py-1.5 px-2",
    "secondary-sm":
      "h-5 md:h-[30px] bg-secondary-gradient rounded-lg text-steel-color text-sm border-[2px] border-secondary-color font-medium text-center hover:text-white py-1 md:py-1.5 px-1 md:px-2",
    "secondary-shadow-sm":
      "h-5 md:h-[30px] bg-secondary-gradient rounded-lg text-white text-xs md:text-sm font-medium text-center shadow-secondary-inset py-0.5 md:py-1.5 px-2",
    "third-sm":
      "h-5 md:h-[30px] bg-third-gradient rounded-lg text-white text-xs md:text-sm font-semibold text-center py-1 md:py-1.5 px-1 md:px-2",
    "tab-secondary-sm":
      "h-10  bg-secondary-gradient rounded-lg text-steel-color text-sm border-[2px] border-secondary-color font-semibold text-center hover:text-white px-5",
    "tab-primary-sm":
      "h-10  bg-primary-gradient rounded-lg text-steel-color text-sm border-[2px] border-primary-color font-semibold text-center hover:text-white",
  };
  // Note: props might be reactivity, so keep props.styleType without deconstructing
  const typeClass = computed(() => typeClassMap[props.styleType || "primary"]);
  return {
    typeClass,
    typeClassMap,
  };
};

// Tabs

export type TabsStyleType = "default" | "primary" | "default-lg";
export type TabItem = {
  label: string;
  value: string;
  [key: string]: string; // TODO: this should be done using generic type. Generic type will be supported since Vue 3.3
};
export const useTabs = (): {
  typeClassMap: {
    [key in TabsStyleType]: {
      tabs: string;
      tabItem: string;
      active: string;
    };
  };
} => {
  const { typeClassMap: buttonClassMap } = useButton();
  const tabItemButton =
    "border-solid border-primary-color h-10 md:h-[45px] rounded-lg text-sm md:text-base font-semibold text-center";
  const tabSmallItemButton =
    "border-solid border-primary-color py-[12px] rounded-lg text-sm font-semibold text-center h-10";
  const typeClassMap = {
    default: {
      tabs: "bg-dark-color shadow-dark-box rounded-lg",
      tabItem: `${tabItemButton} block w-full text-slate-color hover:text-white`,
      active: `${buttonClassMap["secondary"]} block w-full`,
    },
    "default-lg": {
      tabs: "bg-dark-color shadow-dark-box rounded-lg",
      tabItem: `h-[45px] md:h-[50px] border-solid border-primary-color py-[13px] sm:py-[15px] px-5 rounded-lg text-sm md:text-base font-medium text-center block w-full text-slate-color hover:text-white`,
      active: `block w-full h-[45px] md:h-[50px] py-[11px] md:py-[13px] px-4 md:px-5 bg-secondary-gradient border-2 border-solid border-secondary-color rounded-lg text-white text-sm md:text-base font-semibold text-center hover:bg-secondary-hover-gradient hover:border-secondary-hover-color`,
    },
    primary: {
      tabs: "bg-secondary-gradient border-2 border-secondary-color rounded-lg h-10 md:h-[45px]",
      tabItem: `${tabItemButton} block w-full text-steel-color hover:text-white`,
      active: `${buttonClassMap["primary"]} block w-full h-full`,
    },
    "dark-sm": {
      tabs: "bg-dark-color shadow-dark-box rounded-lg h-10",
      tabItem: `${tabSmallItemButton} block w-full text-slate-color hover:text-white`,
      active: `${buttonClassMap["tab-secondary-sm"]} block w-full h-full h-10`,
    },
    "primary-sm": {
      tabs: "bg-secondary-gradient border-2 border-secondary-color h-10 shadow-dark-box rounded-lg",
      tabItem: `${tabSmallItemButton} block w-full text-slate-color hover:text-white`,
      active: `${buttonClassMap["tab-primary-sm"]} block w-full `,
    },
  };
  return {
    typeClassMap,
  };
};

export type InputStyleType = "dark" | "dark-sm" | "secondary";
export type InputStatus = "error" | "warning" | "normal";

export const useInput = (props: {
  styleType?: InputStyleType;
  status?: InputStatus;
}) => {
  const typeClassMap = {
    dark: {
      default: "h-10 md:h-[45px] shadow-dark-box bg-dark-color rounded-lg",
      normal: "",
      error: "",
      warning: "", // TODO: fill when needed
    },
    "dark-sm": {
      default: "h-10 shadow-dark-box bg-dark-color rounded-lg",
      normal: "",
      error: "",
      warning: "",
    },
    secondary: {
      default: "h-10 md:h-[45px] bg-tertiary-gradient rounded-lg",
      normal: "",
      error: "",
      warning: "",
    },
  };
  const typeClass = typeClassMap[props.styleType || "dark"]["default"];
  const statusClass = computed(
    () => typeClassMap[props.styleType || "dark"][props.status || "normal"]
  );
  return {
    typeClass,
    statusClass,
    typeClassMap,
  };
};

export type ScrollStyleType = "primary" | "secondary" | "content" | "invisible";
