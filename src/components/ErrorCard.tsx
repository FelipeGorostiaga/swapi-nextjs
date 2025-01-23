import Image from "next/image";
import { FC } from "react";

const ErrorCard: FC<{ msg: string }> = ({ msg }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Image
        src="/yoda.webp"
        height={200}
        width={150}
        alt={"yoda"}
        className="rounded-full"
      />
      <h3 className="scroll-m-20 text-lg tracking-tight px-4 text-center max-w-[400px] font-thin">
        {msg}
      </h3>
    </div>
  );
};

export default ErrorCard;
