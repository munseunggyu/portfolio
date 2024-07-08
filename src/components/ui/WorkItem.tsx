import { cn } from "@/utils/cn";
import Image from "next/image";

export const WorkItem = ({
  className,
  id,
  title,
  description,
  img,
  contentsClassName,
  titleClassName,
  descriptionClassName
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  contentsClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.2] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div
          className={cn(
            contentsClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          {img && (
            <Image
              src={img}
              alt='logo'
              width={100}
              height={100}
              className='mb-4 '
            />
          )}
          <div
            className={cn(
              titleClassName,
              `font-sans text-xl font-bold z-10 whitespace-pre-wrap break-keep`
            )}
          >
            {title}
          </div>
          <div
            className={cn(
              descriptionClassName,
              "font-sans font-extralight  md:text-xs lg:text-base text-sm text-zinc-400 z-10 whitespace-pre-wrap break-keep"
            )}
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
