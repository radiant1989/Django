import Calculator from "../src/components/organisms/Calculator.vue";

export default {
  title: "Components/Gamba/Calculator",
  component: Calculator,
  argTypes: {
  },
};

const Template = (args) => ({
  components: { Calculator },
  setup: () => ({ args }),
  template: `
    <div style="width: calc(100vw - 40px); max-width: 820px;">
        <Calculator v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
};
