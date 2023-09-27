<script setup lang="ts">
import { GButton, GInput } from "~/components/atoms";
import PasswordInput from "~/components/molecules/inputs/PasswordInput.vue";

const form = reactive({
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
});
</script>
<template>
  <div class="GlobalSettings-Security">
    <div>
      <h4 class="text-sm md:text-base text-white mb-5">Email</h4>
      <form @submit.prevent>
        <div>
          <label class="g-label block mb-[15px]">Email address</label>
          <div class="lg:flex gap-5">
            <div class="lg:w-[465px] g-mb-md">
              <GInput type="email" />
            </div>
            <div class="g-mb-md">
              <GButton class="min-w-button">Confirm</GButton>
            </div>
          </div>
        </div>
      </form>
      <h4 class="text-sm md:text-base text-white mb-5">Password</h4>
      <form class="g-mb-md" @submit.prevent>
        <div class="lg:flex gap-5">
          <div class="flex-1 g-mb-md">
            <label class="g-label block mb-[15px]">Old password</label>
            <PasswordInput v-model="form.oldPassword" />
          </div>
          <div class="flex-1 g-mb-md">
            <label class="g-label block mb-[15px]">New password</label>
            <PasswordInput v-model="form.newPassword" />
          </div>
          <div class="flex-1 g-mb-md">
            <label class="g-label block mb-[15px]">Repeat new password</label>
            <PasswordInput v-model="form.repeatPassword" />
          </div>
        </div>
        <div class="md:flex items-center justify-end gap-5">
          <div class="flex-none hidden md:block">
            <GButton style-type="plain" type="button"
              ><span class="text-white font-medium"
                >Forget password</span
              ></GButton
            >
          </div>
          <div class="flex-none">
            <GButton class="min-w-button">Save changes</GButton>
          </div>
          <div class="md:hidden">
            <GButton style-type="plain" type="button"
              ><span class="text-primary-color">Forget password</span></GButton
            >
          </div>
        </div>
      </form>
    </div>
    <div class="border-b border-[#3D4350] g-mb-md"></div>
    <div>
      <h4 class="text-sm md:text-base text-white mb-4">
        Two-factor Authentication
      </h4>
      <p class="g-mb-md">
        To disable Two-Factor authentication, enter your one-time Password (OTP)
      </p>
    </div>
  </div>
</template>
