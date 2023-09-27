import GRangeSlider from "../src/components/organisms/GRangeSlider.vue";

export default {
  title: "Components/Gamba/RangeSlider",
  component: GRangeSlider,
  argTypes: {
    audioTickInterval: {
      control: {
        type: "range",
        min: 1,
        max: 100,
        step: 1,
      }
    },
    audioTickVolume: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      }
    },
  },
};

const Template = (args) => ({
  components: { GRangeSlider },
  setup: () => ({ args }),
  template: `
    <div style="width: calc(100vw - 40px); max-width: 820px;">
        <GRangeSlider v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  audioTickInterval: 14,
  audioTickVolume: 70,
};
