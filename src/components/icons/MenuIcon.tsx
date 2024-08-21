import BaseIcon from "./BaseIcon";

type Props = Omit<React.ComponentProps<typeof BaseIcon>, "children">;

export default function MenuIcon(props: Props) {
  return (
    <BaseIcon {...props}>
      <line x1="3" x2="21" y1="6" y2="6" />
      <line x1="3" x2="21" y1="12" y2="12" />
      <line x1="3" x2="21" y1="18" y2="18" />
    </BaseIcon>
  );
}
