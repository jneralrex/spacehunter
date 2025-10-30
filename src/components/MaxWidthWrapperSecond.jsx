import { cn } from "@/lib/utils";

const MaxWidthWrapperSecond = ({ className, children }) => {
  return (
    <div className={cn("h-full mx-auto w-full max-w-[1444px] px-2.5 md:px-5", className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapperSecond;
