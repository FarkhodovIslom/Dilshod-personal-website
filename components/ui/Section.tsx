import {ReactNode} from 'react';

type Props = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function Section({id, children, className = ''}: Props) {
  return (
    <section
      id={id}
      className={`px-4 py-20 md:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}
