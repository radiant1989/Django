import Leftbar from "../../src/components/organisms/sidebars/Leftbar.vue";
export default {
  title: "Components/Gamba/Leftbar",
  component: Leftbar,
  args: {},
};

const Template = (args) => ({
  components: { Leftbar },
  setup: () => ({ args }),
  template: `
    <div style="width:full;height:full">
        <Leftbar v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
