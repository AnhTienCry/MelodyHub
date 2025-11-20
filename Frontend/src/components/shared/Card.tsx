interface CardProps {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all ${className}`}>
      {children}
    </div>
  );
}

export default Card;
