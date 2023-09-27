import { ref } from "vue";
import ListingSelect from "../src/components/molecules/selects/ListingSelect.vue";

export default {
  title: "Components/Gamba/ListingSelect",
  component: ListingSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { ListingSelect },
  setup: () => {
    const value = ref('Wade_Cooper');
    return { args, value };
  },
  template: `
    <div style="width: calc(100vw - 40px); max-width: 250px;">
        <ListingSelect v-bind="args" v-model="value"/>
    </div>`,
});

export const Select = Template.bind({});
Select.args = {
  options: [
    { label: "Wade Cooper", value: 'Wade_Cooper' },
    { label: "Arlene Mccoy", value: 'Arlene_Mccoy' },
    { label: "Devon Webb", value: 'Devon_Webb' },
    { label: "Tom Cook", value: 'Tom_Cook' },
    { label: "Tanya Fox", value: 'Tanya_Fox' },
    { label: "Hellen Schmidt", value: 'Hellen_Schmidt' },
  ],
};
