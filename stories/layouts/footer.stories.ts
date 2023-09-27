import Footer from "../../src/components/organisms/Footer.vue";
export default {
  title: "Components/Gamba/Footer",
  component: Footer,
  args: {},
};

const Template = (args) => ({
  components: { Footer },
  setup: () => ({ args }),
  template: `
    <div class="width:full;height:full">
        <Footer v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
