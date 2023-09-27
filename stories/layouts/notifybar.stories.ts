import NotificationBar from "../../src/components/organisms/sidebars/NotificationBar.vue";
export default {
  title: "Components/Gamba/NotificationBar",
  component: NotificationBar,
  args: {},
};

const Template = (args) => ({
  components: { NotificationBar },
  setup: () => ({ args }),
  template: `
    <div style="width:full;height:full">
        <NotificationBar v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
