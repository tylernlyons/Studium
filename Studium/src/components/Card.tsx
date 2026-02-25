interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Card component
const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`app-panel p-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
