type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: Props) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container)] px-4 md:px-6 ${className}`}
    >
      {children}
    </div>
  );
}
