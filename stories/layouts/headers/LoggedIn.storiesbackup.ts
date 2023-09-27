import HeaderLoggedIn from "~/components/organisms/headers/LoggedIn.vue";
export default {
  title: "Components/Gamba/headers/LoggedIn",
  component: HeaderLoggedIn,
  args: {},
};

const Template = () => ({
  components: { HeaderLoggedIn },
  template: `
    <div style="width:full;">
        <HeaderLoggedIn/>
    </div>`,
});

export const Default = Template.bind({});
