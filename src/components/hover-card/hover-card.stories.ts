import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard } from "./hover-card";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
  argTypes: {
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  args: {
  },
};
