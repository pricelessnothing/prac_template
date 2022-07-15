import { Dispatch, SetStateAction } from 'react';

export type MenuProps = {
  items: MenuItem[];
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

type MenuItem = {
  title: string;
  link: string;
};
