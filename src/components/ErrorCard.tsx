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
      <h3 className="scroll-m-20 text-xl tracking-tight">{msg}</h3>
    </div>
  );
};

export default ErrorCard;
