import GButtonGroup from "../src/components/atoms/buttons/GButtonGroup.vue";

export default {
  title: "Components/Gamba/Buttons/GButtonGroup",
  component: GButtonGroup,
  argTypes: {},
};

const Template = (args) => ({
  components: { GButtonGroup },
  setup: () => ({ args }),
  template: `
        <GButtonGroup v-bind="args"/>
`,
});

export const Default = Template.bind({});
Default.args = {};
