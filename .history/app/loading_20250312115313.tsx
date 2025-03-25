import Image from "next/image";
import loader from "@/assets/loader.gif";

const LoadingPage = () => {
  return (
    <div>
      <Image src={loader} />
    </div>
  );
};

export default LoadingPage;
