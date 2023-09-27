<template>
  <div
    class="
      flex flex-row
      justify-end
      items-center
      lg:gap-2.5
      gap-1
      text-sm text-white
      mt-0
      mx-0
      lg:mx-5
    "
  >
    <GHistory :items="histories"></GHistory>

    <div
      class="
        md:px-4
        px-1
        py-0
        md:py-2
        lg:w-[70px]
        md:w-[60px]
        w-[50px]
        md:text-sm
        text-xs
        font-semibold
      "
    >
      <GButton style-type="transparent">History</GButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GButton, notify } from "~/components/atoms";
import GHistory from "~/components/molecules/GHistory.vue";
import { BetGameResponse } from "~/graphql/bet";
import { inject } from "vue";
import { AUTH, LOGIN } from "~/constants";
defineProps<{
  histories: BetGameResponse[];
}>();

const me = inject(AUTH);
const { modalVisible, authType } = inject(AUTH)!;
function onShowLoginModal() {
  authType.value = LOGIN;
  modalVisible.value = true;
}
const router = useRouter();
const handleClick = async () => {
  if (me?.isLoggedIn.value) {
    try {
      router.push({
        path: router.currentRoute.value.path,
        query: {
          modal: "transactions",
        },
      });
    } catch (error: any) {
      console.log("error occured", error);
      notify.error(
        {
          title: "Error",
          text: error?.message?.toString() || "Something went wrong",
        },
        4000
      );
    }
  } else onShowLoginModal();
};
</script>
