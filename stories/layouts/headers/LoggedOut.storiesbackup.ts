import HeaderLoggedOut from "~/components/organisms/headers/LoggedOut.vue";
export default {
  title: "Components/Gamba/headers/LoggedOut",
  component: HeaderLoggedOut,
  args: {},
};

const Template = () => ({
  components: { HeaderLoggedOut },
  template: `
    <div style="width:full;">
        <HeaderLoggedOut/>
    </div>`,
});

export const Default = Template.bind({});
