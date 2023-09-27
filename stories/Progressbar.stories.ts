import GProgressbar from "../src/components/atoms/GProgressbar.vue";

export default {
  title: "Components/Gamba/Progressbars/Progressbar",
  component: GProgressbar,
  args: {
    percentage: 60,
    height: "45px",
  },
  argTypes: {
    percentage: {
      type: Number,
    },
    height: {
      type: String,
    },
  },
};

const Template = (args) => ({
  components: { GProgressbar },
  setup: () => ({ args }),
  template: `
    <div style="width: 820px; height:45px;">
        <GProgressbar v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
