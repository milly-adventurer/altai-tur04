import React, { PropsWithChildren } from "react";

import css from './Page.module.scss';


interface PageProps {
}

const Page = (props: PropsWithChildren<PageProps>) => {
  const { children } = props;
  
  return (
    <div className={css.container}>
      {children}
    </div>
  )
};

export default Page;
