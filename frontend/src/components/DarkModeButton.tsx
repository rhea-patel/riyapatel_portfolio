import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: string;
};

const DarkModeButton: React.FC<Props> = ({ children, asLink, ...rest }) => {
  if (asLink) {
    return (
      <a href={asLink} className="dm-button" {...(rest as any)}>
        {children}
      </a>
    );
  }

  return (
    <button className="dm-button" {...rest}>
      {children}
    </button>
  );
};

export default DarkModeButton;
