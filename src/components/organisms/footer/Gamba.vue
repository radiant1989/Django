<script setup lang="ts">
import { GLogo } from "~/components/atoms";
import { THEME } from "~/constants";
</script>
<template>
  <div
    class="
      flex flex-col
      sm:flex-row
      gap-4
      lg:flex-col
      items-center
      sm:items-start
      lg:w-[400px]
    "
  >
    <GLogo class="block sm:hidden" size="lg" :width="162" />
    <GLogo class="hidden lg:block" size="lg" :width="180" />
    <div class="hidden sm:block lg:hidden w-16">
      <GLogo size="sm" :width="64" />
    </div>
    <p
      class="
        leading-4
        lg:leading-[24px]
        text-slate-color text-center
        md:text-left
        text-[12px]
        md:text-[14px]
        lg:mt-5
      "
    >
      Our goal at Gamba is to provide a fun and exciting gambling experience for
      players. This is made possible by our wide selection of casino games and
      sporting events. Security and transparency are our number one priorities
      as these are vital to building trust between us and players. Get ready for
      the smoothest online casino experience you've ever had and remember to
      gamble responsibly.
    </p>
  </div>
</template>
