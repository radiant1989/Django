<script setup lang="ts">
import { NotificationGroup, Notification } from "@/components/atoms";
import { closeBoldIcon } from "~/icons";
</script>
<template>
  <slot></slot>
  <ClientOnly>
    <Teleport to="body">
      <div class="GNotification-root">
        <NotificationGroup group="top-left">
          <div
            class="
              fixed
              top-[70px]
              md:top-[104px]
              left-5
              md:min-w-[300px]
              flex
              items-start
              justify-start
              pointer-events-none
              z-[200]
            "
            style="max-width: calc(100% - 40px)"
          >
            <div class="w-full md:max-w-md">
              <Notification
                v-slot="{ notifications, close }"
                enter="ease-out duration-300 transition"
                enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
                enter-to="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
                move="transition duration-500"
                move-delay="delay-300"
              >
                <div
                  v-for="notification in notifications"
                  :key="notification.id"
                  class="
                    w-full
                    md:max-w-md
                    mb-4
                    overflow-hidden
                    bg-secondary-gradient
                    rounded-[8px]
                    pointer-events-auto
                    ring-1 ring-black ring-opacity-5
                    group
                    shadow-notification
                  "
                >
                  <div class="flex items-stretch">
                    <div
                      class="
                        shrink-0
                        w-[61px]
                        flex
                        items-center
                        justify-center
                        bg-ebony-clay-color
                      "
                    >
                      <svg :class="[notification.icon?.class]">
                        <use :xlink:href="notification.icon?.href"></use>
                      </svg>
                    </div>
                    <div class="ml-3 flex-1 py-4 px-3">
                      <p
                        class="
                          text-sm
                          md:text-base
                          leading-[1]
                          md:leading-[1]
                          font-semibold
                          text-white
                          mb-3
                        "
                      >
                        {{ notification.title }}
                      </p>
                      <p
                        class="
                          text-xs
                          md:text-sm
                          font-semibold
                          text-slate-color
                        "
                      >
                        {{ notification.text }}
                      </p>
                    </div>
                    <div class="flex items-center justify-center px-1.5">
                      <button
                        class="
                          p-2
                          border-0
                          duration-150
                          hover:transform
                          hover:-rotate-90
                          hover-transition-all
                          hover:ease-in-out
                          text-steel-color
                          hover:text-white
                        "
                        @click="close(notification.id)"
                      >
                        <span class="sr-only">close notification</span>
                        <svg class="w-4 h-4">
                          <use :xlink:href="closeBoldIcon"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    v-if="notification.timeout !== -1"
                    class="h-[7px] bg-ebony-clay-color shadow-notification"
                  >
                    <div
                      class="
                        timeout-progress__filled
                        h-full
                        group-hover:animation-pause
                      "
                      :style="{
                        animationDuration: `${notification.timeout}ms`,
                      }"
                      @animationend="close(notification.id)"
                    ></div>
                  </div>
                </div>
              </Notification>
            </div>
          </div>
        </NotificationGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>
<style scoped lang="scss">
.timeout-progress__filled {
  background-image: linear-gradient(
    180deg,
    #343a47 0%,
    rgba(44, 49, 64, 0) 100%
  );
  filter: drop-shadow(0px 3.04545px 8.375px rgba(0, 0, 0, 0.27));
  animation-name: progress-reverse;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes progress-reverse {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
