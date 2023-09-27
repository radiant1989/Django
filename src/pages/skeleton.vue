<template>
  <main class="min-h-screen p-8">
    <div>
      <h1 class="font-semibold text-3xl" style="color: #fff;">Skeleton Loaders</h1>
      <div style="color:#fff">This skeleton loader was created with Nuxt and Tailwind. It uses just one div for the skeleton and one div for the shimmer. Props are used to set the skeleton type (rectangle or circle) as well as the skeleton color. Rather than creating a separate skeleton component for each element or section (e.g texts, headings, images, videos etc), the concept is to utilize Tailwind classes to shape multiple skeleton loader instances.</div><br/>
      <div style="color:#fff"><u>PROPS</u> <br>type: rectangle or circle<br> bgClass: set the class for the bg color of the loader<br>cssClass: set custom CSS classes for the loader<br>shimmerColor: set the shimmer color, must be in hex</div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div style="color: #fff;">
          Rectangle
          <SkeletonLoader class="w-full h-52" />
        </div>
        <div class="flex justify-center">
          <div style="color: #fff;">
            Circle
            <SkeletonLoader type="circle" class="w-20 h-20" />
          </div>
        </div>
        <div>
          <div>
            <SkeletonLoader class="w-16 h-5" />
            <SkeletonLoader class="w-32 h-4 mt-4" />
            <SkeletonLoader class="w-72 h-2.5 mt-2" />
            <SkeletonLoader class="w-52 h-4 mt-6" />
            <SkeletonLoader class="w-72 h-2.5 mt-2" />
            <SkeletonLoader class="w-72 h-2 mt-2" />
          </div>
        </div>
        <div>
          <div class="mt-2" style="color: #fff;">Custom background and shimmer color</div>
          <SkeletonLoader class="w-full h-28" bg-class="bg-green-700" shimmer-color="#0e1116" />
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
        <div style="color: #fff;">
          Video
          <SkeletonLoader class="flex justify-center items-center h-56">
            <svg class="w-12 h-12 text-slate-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#f3f4f6" viewBox="0 0 384 512">
              <path
                d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"
              />
            </svg>
          </SkeletonLoader>
        </div>
        <div style="color: #fff;">
          Image with text
          <div class="space-y-8 md:space-y-0 md:space-x-8 md:flex md:items-center">
            <SkeletonLoader class="flex justify-center items-center w-full h-48 sm:w-96">
              <svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="#f3f4f6" viewBox="0 0 640 512">
                <path
                  d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
                />
              </svg>
            </SkeletonLoader>
            <div class="w-full">
              <SkeletonLoader class="h-2.5 w-48 mb-4" />
              <SkeletonLoader class="h-2 max-w-[480px] mb-2.5" />
              <SkeletonLoader class="h-2 mb-2.5" />
              <SkeletonLoader class="h-2 max-w-[440px] mb-2.5" />
              <SkeletonLoader class="h-2 max-w-[460px] mb-2.5" />
              <SkeletonLoader class="h-2 max-w-[360px]" />
            </div>
          </div>
        </div>
        <div>
          <div class="p-4 max-w-sm rounded border border-gray-200 md:p-6">
            <SkeletonLoader class="mb-4 h-48 flex justify-center items-center text-gray-400" style="color: #fff;"> Image </SkeletonLoader>
            <SkeletonLoader class="h-2.5 w-48 mb-4" />
            <SkeletonLoader class="h-2 mb-2.5" />
            <SkeletonLoader class="h-2 mb-2.5" />
            <SkeletonLoader class="h-2" />
            <div class="flex items-center mt-4 space-x-3">
              <SkeletonLoader type="circle" class="w-14 h-14 flex justify-center items-center text-gray-400" style="color: #fff;"> Icon </SkeletonLoader>
              <div>
                <SkeletonLoader class="h-2.5 w-32 mb-2"></SkeletonLoader>
                <SkeletonLoader class="w-48 h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import SkeletonLoader from '@/components/molecules/SkeletonLoader.vue';
</script>

