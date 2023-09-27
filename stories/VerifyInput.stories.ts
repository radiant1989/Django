import GVerifyInput from "../src/components/atoms/inputs/GVerifyInput.vue";

export default {
  title: "Components/Gamba/Inputs/VerifyInput",
  component: GVerifyInput,
  args: {},
};

const Template = (args) => ({
  components: { GVerifyInput },
  setup: () => ({ args }),
  template: `
    <div style="width: 820px; height:45px">
        <GVerifyInput v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  inputType: "password",
};
