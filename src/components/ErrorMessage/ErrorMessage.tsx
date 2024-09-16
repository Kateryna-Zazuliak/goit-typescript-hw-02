import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { toastStyles } from "../../toast";

type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  useEffect(() => {
    toast(message, toastStyles);
  }, [message]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default ErrorMessage;
