import { FC } from "react";
import { LoaderIcon } from "../loader-icon";

interface FullPageLoaderProps {
  text?: string;
}

export const FullPageLoader: FC<FullPageLoaderProps> = ({ text }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="text-center">
        <div className="mx-auto ml-6 mb-4 w-48">
        <LoaderIcon className="animate-spin text-primary mb-4" width="40" height="40" />
        </div>

        {text && <p className="font-bold text-primary">{text}</p>}
      </div>
    </div>
  );
};