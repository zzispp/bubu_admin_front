import React from 'react';

type LogoProps = {
  size?: number;
  fontSize?: string;
  text?: string;
  showText?: boolean;
} & React.HTMLAttributes<SVGElement>;

const Logo: React.FC<LogoProps> = ({ size = 35, fontSize = 'text-xl', text = 'PuPu 加密支付系统', showText = true, ...props }) => {
  return (
    <div className="flex items-center">
      <svg
        fill="none"
        height={size}
        viewBox="0 0 32 32"
        width={size}
        className="text-foreground"
        {...props}
      >
        <path
          clipRule="evenodd"
          d="M16 4L4 28H28L16 4ZM16 10L10 22H22L16 10ZM14.5 15.5L13 18.5H19L17.5 15.5H14.5Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
      {showText && (
        <span className={`ml-2 ${fontSize} font-bold text-foreground`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Logo;
