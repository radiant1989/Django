import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import GCollapse from "../src/components/atoms/GCollapse.vue";
import GInput from "../src/components/atoms/GInput.vue";

const meta: Meta<typeof GCollapse> = {
  title: "Components/Gamba/Collapse",
  component: GCollapse,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof GCollapse>;

export const Default: Story = {
  render: (args) => ({
    components: { GCollapse, GInput },
    setup() {
      return { args };
    },
    template: `
    <div class="bg-[#212530] px-5">
      <GCollapse :left="false">
        <template v-slot:trigger
          ><div
            class="
              text-sm
              font-medium
              leading-[17px]
              font-proximanova
              text-steel-color
            "
          >
            Referral Code (Optional)
          </div></template
        >
        <template v-slot:default>
          <div class="py-2">
            <GInput>
              <template #suffix>
                <div class="h-full flex items-center pr-2">
                  <div
                    class="
                      bg-primary-gradient bg-clip-text
                      text-xs
                      cursor-pointer
                      font-semibold
                      text-transparent
                    "
                  >
                    Commission %XX
                  </div>
                </div>
              </template>
            </GInput>
          </div>
        </template>
      </GCollapse>
    </div>`,
  }),
};
