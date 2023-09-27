import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { GModal, GButton } from "../src/components/atoms";

const meta: Meta<typeof GModal> = {
  title: "Components/Gamba/Modals",
  component: GModal,
  argTypes: {
  },
};

export default meta;

type Story = StoryObj<typeof GModal>;

export const Default: Story = {
  render: (args) => ({
    components: { GModal, GButton },
    setup() {
      const visible = ref(args.modelValue);
      return { args, visible };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 500px;">
      <GModal v-bind="args" v-model="visible">
        <div class="p-6">
          <h2 class="mb-5 text-lg font-semibold">Here is Modal</h2>
          <div class="mb-5">
            <p>Any content can be here, and This is modal which will be used in our frontend.</p>
            <p>It opens to scale continously, it is custom comoponent using vue3 Transition and Teleport</p>
            <p>supports animation in appear initially.</p>
            <p>Width and height animation is not implemented yet, this will be added in next sprint</p>
          </div>
          <GButton @click="visible=false;">Got it</GButton>
        </div>
      </GModal>
      <GButton @click="visible=true" :block="false">Open Modal</GButton>
    </div>`,
  }),
  args: {
    center: false,
    modelValue: false,
    width: '420px'
  },
};

export const DynamicContent: Story = {
  render: (args) => ({
    components: { GModal, GButton },
    setup() {
      const visible = ref(args.modelValue);
      const index = ref<boolean>(true);
      return { args, visible, index };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 500px;">
      <GButton @click="visible = true" :block="false">Open Modal</GButton>
      <GModal v-model="visible">
        <div class="p-6" v-if="index">
          <h2 class="mb-5 text-lg font-semibold">Here is Modal Content1</h2>
          <GButton @click="index = !index">Change</GButton>
        </div>
        <div class="p-6" v-if="!index">
          <h2 class="mb-5 text-lg font-semibold">Here is ModalContent 2</h2>
          <GButton @click="index = !index">Change</GButton>
        </div>
      </GModal>
    </div>`,
  }),
  args: {
    center: true,
    modelValue: false,
    width: '420px'
  },
};
