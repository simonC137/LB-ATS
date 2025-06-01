import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  onClick?: () => void;
};

export const Card: React.FC<CardProps> = ({ children,onClick }) => {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-md cursor-pointer transition hover:shadow-lg" onClick={onClick}>{children}</div>
  );
};

type CardContentProps = {
  children: ReactNode;
};

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

export default Card;
