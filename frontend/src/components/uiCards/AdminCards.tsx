import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-md bg-white p-4">{children}</div>
  );
};

type CardContentProps = {
  children: ReactNode;
};

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-2">{children}</div>;
};

export default Card;
