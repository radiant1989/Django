import GHistoryItem from "../src/components/molecules/history/GHistoryItem.vue";

export default {
  title: "Components/Gamba/GHistoryItem",
  component: GHistoryItem,
  argTypes: {
    autolostFocus: {
      control: "select",
      options: [500, 1000, 2000, 3000],
    },
    static: {
      control: "select",
      options: [true, false],
    },
  },
};

const Template = (args) => ({
  components: { GHistoryItem },
  setup: () => ({ args }),
  template: `
    <div style="width: calc(100vw - 40px); max-width: 250px;">
        <GHistoryItem v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  item: {
    balance: 0,
    delta: 0,
    matchId: "fdsfsfa",
    partialResult:
      '{"parameters":{"condition":"over","target":50},"result":{"rng":"58.19"},"roundStatus":"won","payoutMultiplier":1.98}',
    status: "won",
    transactionId: "fdsfasfsaf",
  },
};
