import type { Meta, StoryObj } from "@storybook/vue3";
import { GScrollbar } from "~/components/atoms";

const meta: Meta<typeof GScrollbar> = {
  title: "Components/Gamba/Scrollbar",
  component: GScrollbar,
  argTypes: {
    styleType: {
      control: "select",
      options: ["primary", "secondary", "invisible"],
    },
  },
  args: {
    height: "400px",
  },
};
export default meta;

type Story = StoryObj<typeof GScrollbar>;

export const Default: Story = {
  render: (args) => ({
    components: { GScrollbar },
    setup() {
      return { args };
    },
    template: `<div class="bg-ebony-clay-color m-5 p-5 rounded-lg w-[400px]">
    <GScrollbar v-bind="args" height="200px">
        <p class="text-white text-base px-5">
        This percentage represents the portion of your affiliate commission that
        you choose to give back to the people who use your referral code. By
        doing so, you provide an incentive for more users to sign up through
        your code. Your affiliate commission starts at a base rate of 10%.
        However, as the total amount wagered by your referrals increases, your
        commission percentage will rise too. This is calculated based on the
        total wagered amount from all your referrals across all your affiliate
        codes in the past 30 days. Here are the tiers: $0-25,000 wagered = 10%
        commission $25,000-75,000 wagered = 12% commission $75,000-150,000
        wagered = 14% commission $150,000-250,000 wagered = 16% commission
        $250,000-500,000 wagered = 18% commission $500,000- $2,000,000 wagered =
        20% commission $2,000,000 and above wagered = 25% commission This means
        your commission percentage can fluctuate based on your referrals'
        wagering activity in the last 30 days. So, if your referrals wager more,
        your commission rate can go up. Conversely, if your referrals' wagering
        slows down, your commission rate can decrease. These changes apply to
        all your active and any new affiliate codes you create. This keeps your
        earnings dynamic, directly linking them with your referrals' activities.
        More wagering from your referrals leads to higher commissions for you,
        while less wagering could result in a lower rate. Choose wisely: a
        higher percentage might attract more users, but it also means a lower
        net gain for you. Once set, this percentage cannot be adjusted for this
        particular referral code. However, you do have the option to create a
        new referral code with a different 'back to referral' rate in the
        future. Please carefully consider the percentage before setting it, as
        it plays a key role in shaping your referral strategy and potential
        earnings.
        </p>
  </GScrollbar>
  </div>`,
  }),
  args: {
    styleType: "primary",
  },
};
