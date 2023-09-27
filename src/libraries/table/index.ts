export const trHeight = "min-h-[50px] md:min-h-[55px]";
export const useTable = () => {
  return {
    table: "GTable",
    thead: "border-b border-[#3d4350] pb-[15px]",
    tbody: "text-slate-color text-sm font-medium",
    tr: "flex items-center min-h-[50px] md:min-h-[55px]",
    td: "min-w-0",
    th: "min-w-0 text-white font-semibold",
    trs: [
      "border-2 border-solid border-secondary-color rounded-lg bg-secondary-gradient",
      "",
    ],
  };
};
