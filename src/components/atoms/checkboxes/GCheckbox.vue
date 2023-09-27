<script setup lang="ts">
const props = defineProps({
  labelClass: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const handleChange = (e: Event) => {
  emits('update:modelValue', (e.target as HTMLInputElement).checked)
}

</script>
<template>
  <input :checked="modelValue" @change="handleChange" class="inp-cbx" id="cbx" type="checkbox" style="display: none" />
  <label class="cbx flex" for="cbx">
    <span class="w-[12px] h-[12px] flex-none">
      <svg width="12" height="12" viewbox="0 0 12 12">
        <polyline points="0 5 4.5 9 10 1"></polyline>
      </svg>
    </span>
    <span :class="[props.labelClass !== '' && props.labelClass]">{{
      props.label
    }}</span></label
  >
</template>
<style scoped>
.cbx {
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
.cbx span {
  display: inline-block;
  vertical-align: middle;

  transform: translate3d(0, 0, 0);
}
.cbx span:first-child {
  position: relative;
  width: 16px;
  height: 16px;
  transform: scale(1);
  vertical-align: middle;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(2.3172px);
  transition: all 0.2s ease;
}
.cbx span:first-child svg {
  position: absolute;
  z-index: 1;
  top: 2px;
  left: 2px;
  fill: none;
  stroke: white;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child:before {
  content: "";
  width: 100%;
  height: 100%;
  background: theme(colors.primary-color);
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
  transition-delay: 0.2s;
}
.cbx span:last-child {
  margin-left: 8px;
  color: theme(colors.slate-color);
}
.cbx span:last-child:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 100%;
  background: #b9b8c3;
  transform-origin: 0 0;
  transform: scaleX(0);
}
.cbx:hover span:first-child {
  border-color: theme(colors.primary-color);
}

.inp-cbx:checked + .cbx span:first-child {
  border-color: theme(colors.primary-color);
  background: theme(backgroundImage.primary-gradient);
  animation: check 0.6s ease;
  box-shadow: 0px 6.1792px 18.5376px rgba(16, 150, 87, 0.27);
}
.inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.inp-cbx:checked + .cbx span:first-child:before {
  /* transform: scale(2.2); */
  opacity: 0;
  transition: all 0.6s ease;
}

.inp-cbx:checked + .cbx span:last-child {
  color: #b9b8c3;
  transition: all 0.3s ease;
}
.inp-cbx:checked + .cbx span:last-child:after {
  transition: all 0.3s ease;
}

@keyframes check {
  50% {
    transform: scale(1.2);
  }
}
</style>
