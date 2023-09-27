import GCheckbox from "../src/components/atoms/checkboxes/GCheckbox.vue";
export default {
  title: "Components/Gamba/Checkboxes/Default",
  component: GCheckbox,
  args: {
    labelClass:
      "text-steel-color text-[12px] leading-[14.62px] font-proximanova font-medium",
    label:
      "I agree with user agreement, and confirm that I am at least 18 years old!",
  },
  argTypes: {
    labelClass: {
      name: "Label class",
      control: {
        type: "string",
      },
    },
    label: {
      name: "Label class",
      control: {
        type: "string",
      },
    },
  },
};

const Template = (args) => ({
  components: { GCheckbox },
  setup: () => ({ args }),
  template: `
    <div style="width:400px;">
        <GCheckbox v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
