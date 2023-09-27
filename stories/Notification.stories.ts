import type { Meta, StoryObj } from "@storybook/vue3";
import { GButton, notify } from "~/components/atoms";
import { userIcon, timesIcon } from "~/icons";

const meta: Meta = {
  title: "Components/Gamba/Notifications",
};

export default meta;

export const Error: StoryObj = {
  render: (args) => ({
    components: { GButton },
    setup() {
      const notifyError = () => {
        notify.error(
          {
            title: "Error",
            text: "Invalid credentials.",
          },
          -1
        );
      }
      const notifyUser = () => {
        notify.success({
          title: "Welcome!",
          text: `Lets have some fun “Username12312”!`,
          icon: {
            class: "w-10 h-8 text-[#FFDB41]",
            href: userIcon
          }
        })
      }
      return { args, notifyError, notifyUser };
    },
    template: `<div class="bg-ebony-clay-color m-5 pt-5 rounded-lg" style="width: calc(100vw - 40px); max-width: 500px;">
      <div class="mb-3"><GButton @click="notifyError">notify error</GButton></div>
      <GButton @click="notifyUser">notify user</GButton>
    </div>`,
  }),
  args: {},
};
