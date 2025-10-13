import {
  ChevronDoubleDownIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";

const createIcon = (Icon: React.FC<React.SVGProps<SVGSVGElement>>) => {
  return (props: React.SVGProps<SVGSVGElement>) => <Icon {...props} />;
};

export const BottomArrowIcon = createIcon(ChevronDoubleDownIcon);

export const PlusIcon = createIcon(PlusCircleIcon);
