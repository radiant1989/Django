import GRadiogroup from "../src/components/atoms/radios/GRadiogroup.vue";

export default {
  title: "Components/Gamba/Radios/RadioGroup",
  component: GRadiogroup,
  args: {
    dataList: ["item1", "item2", "item3"],
    direction: "col",
    size: 25,
  },
  argTypes: {
    dataList: {
      name: "Datalist",
      control: {
        type: "array",
      },
    },
    direction: {
      name: "Radio group direction",
      description: "Radio group direction",
      control: {
        type: "select",
        options: ["col", "row"],
      },
    },
    size: {
      name: "size",
      control: {
        type: "number",
      },
    },
  },
};

const Template = (args) => ({
  components: { GRadiogroup },
  setup: () => ({ args }),
  template: '<div class="bg-black"><GRadiogroup v-bind="args"/></div>',
});

export const Default = Template.bind({});
