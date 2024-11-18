interface Props {
  className?: string;
}
export function Divisor({ className }: Props) {
  return (
    <div className={`border-dashed border-t ${className} h-[1px] w-full`}></div>
  );
}
