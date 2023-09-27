<script setup lang="ts">
import { GModal, GButton } from "~/components/atoms";
import { refreshIcon } from "~/icons";
defineProps({
  isOpen: Boolean,
  loading: Boolean,
});
defineEmits<{
  (e: "close:modal"): void;
  (e: "confirm:changeAddress"): void;
}>();
</script>
<template>
  <GModal
    :model-value="isOpen"
    @update:model-value="$emit('close:modal')"
    width="465px"
  >
    <div class="p-5">
      <div class="flex gap-2 items-center g-mb-md">
        <svg class="md:w-5 md:h-5 w-4 h-4 text-steel-color">
          <use :xlink:href="refreshIcon"></use>
        </svg>
        <span class="text-white g-text-base fong-semibold"
          >Confirm Address Change</span
        >
      </div>
      <p class="text-white g-text-sm g-mb-md font-semibold">
        Are you sure you want to update your BTC deposit address?
      </p>
      <p class="text-steel-color g-text-sm mb-2.5 font-semibold">
        Important Notes:
      </p>
      <ul
        class="
          text-steel-color
          g-text-sm
          list-disc
          g-mb-md
          pl-5
          flex flex-col
          gap-2.5
          font-semibold
        "
      >
        <li>
          Once changed, your old address will no longer work. All deposits must
          be made to the new address.
        </li>
        <li>
          Double-check there are no ongoing deposits before making this switch.
        </li>
        <li>This action is final and can't be reversed.</li>
      </ul>
      <div class="flex flex-row justify-between gap-4">
        <GButton
          style-type="primary"
          :loading="loading"
          @click="$emit('confirm:changeAddress')"
          >Confirm</GButton
        >
        <GButton style-type="secondary" @click="$emit('close:modal')"
          >Cancel</GButton
        >
      </div>
    </div>
  </GModal>
</template>
