import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
  PlusCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const createIcon = (Icon: React.FC<React.SVGProps<SVGSVGElement>>) => {
  return (props: React.SVGProps<SVGSVGElement>) => <Icon {...props} />;
};

export const BottomArrowIcon = createIcon(ChevronDoubleDownIcon);

export const UpArrowIcon = createIcon(ChevronDoubleUpIcon);

export const PlusIcon = createIcon(PlusCircleIcon);

export const HamburgerIcon = createIcon(Bars3Icon);

export const CloseIcon = createIcon(XMarkIcon);
