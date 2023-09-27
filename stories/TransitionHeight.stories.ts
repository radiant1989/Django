import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { GTransitionHeight, GButton } from "../src/components/atoms";

const meta: Meta<typeof GTransitionHeight> = {
  title: "Components/Gamba/Transitions",
  component: GTransitionHeight,
};

export default meta;

type Story = StoryObj<typeof GTransitionHeight>;

export const Height: Story = {
  render: (args) => ({
    components: { GTransitionHeight, GButton },
    setup() {
      return { args };
    },
    template: `<div class="bg-ebony-clay-color m-5 p-5 rounded-lg" style="width: calc(100vw - 40px); max-width: 500px;">
      <GTransitionHeight v-slot="{state, transitioning, setState}">
        <div class="text-white">
          <h2 class="mb-3">This is initial Text</h2>
          <GButton v-if="!state" @click="setState(true)">Show More</GButton>
          <GButton v-else @click="setState(false)">Show Less</GButton>
          <div v-if="state || transitioning" :class="{'h-0': !state}">
            <div class="pt-10">
              Any content can be here, and This is animated height which will be used in our frontend.
              It opens to scale continously, it is custom comoponent using ResizeObserver and tailwind transtion supports defensive for various cases.
              height animation is implemented, thank you
            </div>
          </div>
        </div>
      </GTransitionHeight>
    </div>`,
  }),
  args: {},
};
