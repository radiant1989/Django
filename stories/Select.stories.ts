import { ref } from "vue";
import { GSelect, ScrollStyleType } from "../src/components/atoms";

export default {
  title: "Components/Gamba/Select",
  component: GSelect,
  argTypes: {},
};

const Template = (args) => ({
  components: { GSelect },
  setup: () => {
    const value = ref("Wade_Cooper");
    return { args, value };
  },
  template: `
    <div style="width: calc(100vw - 40px); max-width: 250px;">
        <GSelect v-bind="args" v-model="value"/>
    </div>`,
});

export const Select = Template.bind({});
Select.args = {
  options: [
    { label: "Wade Cooper", value: "Wade_Cooper" },
    { label: "Arlene Mccoy", value: "Arlene_Mccoy" },
    { label: "Devon Webb", value: "Devon_Webb" },
    { label: "Tom Cook", value: "Tom_Cook" },
    { label: "Tanya Fox", value: "Tanya_Fox" },
    { label: "Hellen Schmidt", value: "Hellen_Schmidt" },
    { label: "Wade Cooper", value: "Wade_Cooper" },
    { label: "Arlene Mccoy", value: "Arlene_Mccoy" },
    { label: "Devon Webb", value: "Devon_Webb" },
    { label: "Tom Cook", value: "Tom_Cook" },
    { label: "Tanya Fox", value: "Tanya_Fox" },
    { label: "Hellen Schmidt", value: "Hellen_Schmidt" },
    { label: "Wade Cooper", value: "Wade_Cooper" },
    { label: "Arlene Mccoy", value: "Arlene_Mccoy" },
    { label: "Devon Webb", value: "Devon_Webb" },
    { label: "Tom Cook", value: "Tom_Cook" },
    { label: "Tanya Fox", value: "Tanya_Fox" },
    { label: "Hellen Schmidt", value: "Hellen_Schmidt" },
  ],
  scrollType: "primary" as ScrollStyleType,
  dropdownHeight: "200px",
};
