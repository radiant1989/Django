<script setup lang="ts">
import { THEME } from "~/constants";
import { responsibleGamblingIcon, eighteenPlusIcon } from "@/icons";
import Support from "./footer/Support.vue";
import About from "./footer/About.vue";
import FollowUs from "./footer/FollowUs.vue";
import AcceptedCurrencies from "./footer/AcceptedCurrencies.vue";
import Gamba from "./footer/Gamba.vue";
const { screen } = inject(THEME)!;
const isSSR = process.server;
</script>
<template>
  <div class="bg-[#212530] p-5 md:py-[30px] md:px-10 font-medium w-full">
    <div class="max-w-content mx-auto">
      <div
        class="flex flex-col divide-y-[1px] divide-[#3D4350] lg:justify-center"
      >
        <div class="flex flex-col sm:flex-row w-full g-mb-md">
          <div class="flex flex-row sm:w-1/2">
            <Gamba class="hidden lg:block" />
            <div class="w-1/2 lg:flex lg:justify-center lg:py-5">
              <Support />
            </div>
            <About class="w-1/2 lg:hidden" />
          </div>
          <div
            class="
              flex-row
              hidden
              lg:flex
              lg:gap-[30px]
              lg:justify-between
              lg:w-1/2
            "
          >
            <About class="py-5" />
            <div class="flex flex-col max-w-[360px] gap-[30px] lg:py-5">
              <AcceptedCurrencies />
              <FollowUs />
            </div>
          </div>
          <div
            class="
              flex flex-col
              sm:w-1/2
              max-w-[380px]
              mt-5
              sm:mt-0
              gap-[30px]
              lg:hidden
            "
          >
            <AcceptedCurrencies />
            <FollowUs />
          </div>
        </div>
        <div class="block lg:hidden md:py-[30px] py-5">
          <Gamba />
        </div>
        <div
          class="
            flex flex-wrap
            justify-between
            items-center
            lg:py-9
            lg:px-10
            lg:leading-[24px]
            px-0
            text-xs
            md:text-sm
            flex-col
            py-[25px]
            sm:flex-row
          "
        >
          <div class="flex flex-row gap-4 items-center sm:w-1/2">
            <NuxtLink
              to="https://gamba.com/verify?license=check"
              target="_blank"
            >
              <img
                alt="loading..."
                src="https://imagedelivery.net/ud0nKgC6_aGi3aA3QSI9OA/a0382fc7-5825-43ef-5d3f-9727915d6e00/public"
              />
            </NuxtLink>
            <p class="text-slate-color">
              Gamba is owned and operated by Gaming Gaming N.V, registration
              number: 162205, registered address: Zuikertuintjeweg Z/N
              (Zuikertuin Tower). Contact us at support@gamba.com.
            </p>
          </div>

          <div
            class="
              flex flex-row
              justify-between
              sm:justify-end
              mt-5
              sm:mt-0
              gap-5
              w-full
              sm:w-1/2
            "
          >
            <svg class="w-[138px] h-12 text-steel-color">
              <use :xlink:href="responsibleGamblingIcon" />
            </svg>
            <svg class="w-[47px] h-[47px] text-steel-color">
              <use :xlink:href="eighteenPlusIcon" />
            </svg>
          </div>
        </div>
        <div
          class="
            flex flex-row flex-wrap
            items-center
            justify-center
            divide-x-[1px] divide-[#858DA0]
            pt-5
            md:pt-[30px]
            text-xs
            md:text-sm
          "
        >
          <div class="flex flex-row pr-2">
            <span class="text-steel-color">Support -&nbsp; </span>
            <span class="text-white">help@gamba.com</span>
          </div>
          <div class="flex flex-row px-2">
            <span class="text-steel-color">Press -&nbsp; </span>
            <span class="text-white">press@gamba.com</span>
          </div>
          <div class="flex flex-row pl-2">
            <span class="text-steel-color">Partnerships -&nbsp; </span>
            <span class="text-white">partner@gamba.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
