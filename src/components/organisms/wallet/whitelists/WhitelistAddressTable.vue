<script setup lang="ts">
import { GButton } from "~/components/atoms";
import { useTable } from "~/libraries/table";
import { THEME, cryptoCurrencies, WALLET } from "~/constants";
import { RedCrossIcon } from "~/icons";

const props = defineProps({
  perPage: {
    type: Number,
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

const { screen } = inject(THEME)!;
const { whitelist } = inject(WALLET)!;
const rows = computed(() => {
  const startIndex = props.pageNumber * props.perPage;
  return whitelist.value
    .filter((list) =>
      props.currency !== "ALL" ? list.currency === props.currency : list
    )
    .slice(startIndex, startIndex + props.perPage);
});
const { table, thead, tbody, trs, th, tr, td } = useTable();
const columns = ["1 0 90px", "1 0 60px", "1 0 180px", "1 0 20px"];
const mobileColumns = ["1 0 72px", "1 0 60px", "1 0 90px", "1 0 20px"];
defineEmits<{
  (e: "delete:address", address: string): void;
}>();
</script>
<template>
  <div class="overflow-auto">
    <div :class="table">
      <div class="px-5 md:px-[30px]" :class="thead">
        <div class="text-center font-semibold flex items-center">
          <div
            class="pl-5 text-left text-sm md:text-base"
            :class="th"
            :style="
              screen.md ? { flex: columns[0] } : { flex: mobileColumns[0] }
            "
          >
            COIN
          </div>
          <div
            class="text-sm md:text-base"
            :class="th"
            :style="
              screen.md ? { flex: columns[1] } : { flex: mobileColumns[1] }
            "
          >
            NAME
          </div>
          <div
            :class="th"
            class="text-sm md:text-base"
            :style="
              screen.md ? { flex: columns[2] } : { flex: mobileColumns[2] }
            "
          >
            ADDRESS
          </div>
          <div
            :class="th"
            class="text-sm md:text-base"
            :style="
              screen.md ? { flex: columns[3] } : { flex: mobileColumns[3] }
            "
          ></div>
        </div>
      </div>
      <div class="px-5 md:px-[30px] mt-5" :class="tbody">
        <div
          v-for="(row, index) in rows"
          :class="[tr, trs[index % 2]]"
          class="font-semibold"
        >
          <div
            class="pl-3 g-text-sm flex items-center gap-2"
            :class="td"
            :style="
              screen.md ? { flex: columns[0] } : { flex: mobileColumns[0] }
            "
          >
            <SolIcon v-if="cryptoCurrencies[row.currency].icon === 'SOL'" />
            <MaticIcon
              v-else-if="cryptoCurrencies[row.currency].icon === 'MATIC'"
            />
            <svg
              class="
                w-[14px]
                h-[14px]
                md:w-4
                md:h-4
                text-steel-color
                group-hover:text-white
              "
              v-else
            >
              <use :xlink:href="cryptoCurrencies[row.currency].icon"></use>
            </svg>
            <span class="font-semibold">
              {{ row.currency }}
            </span>
          </div>
          <div
            :class="td"
            class="text-center g-text-sm"
            :style="
              screen.md ? { flex: columns[1] } : { flex: mobileColumns[1] }
            "
          >
            <span class="text-slate-color g-text-sm font-semibold">{{
              row.address_name
            }}</span>
          </div>
          <div
            :class="td"
            :style="
              screen.md ? { flex: columns[2] } : { flex: mobileColumns[2] }
            "
          >
            <div class="text-center g-text-sm font-semibold">
              {{ row.address.slice(0, 6) }}...{{
                row.address.slice(row.address.length - 5, row.address.length)
              }}
            </div>
          </div>
          <div
            :class="td"
            class="flex flex-row justify-center items-center"
            :style="
              screen.md ? { flex: columns[3] } : { flex: mobileColumns[3] }
            "
          >
            <GButton
              style-type="transparent"
              :block="true"
              @click="$emit('delete:address', row.address)"
            >
              <RedCrossIcon />
            </GButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
