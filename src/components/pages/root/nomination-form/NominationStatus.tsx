import React from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import { MdPending } from "react-icons/md";

interface NominationStatusProps {
  status: string;
  formData: any;
}

const NominationStatus: React.FC<NominationStatusProps> = ({
  status,
  formData,
}) => {
  const getStatusInfo = () => {
    switch (status) {
      case "SUBMITTED":
        return {
          icon: <FaCheckCircle className="text-green-500 text-9xl mb-4" />,
          text: "Your nomination has been submitted successfully.",
          color: "text-green-700",
        };
      case "UNDER_REVIEW":
        return {
          icon: <FaHourglassHalf className="text-blue-500 text-9xl mb-4" />,
          text: "Your nomination is currently under review.",
          color: "text-blue-700",
        };
      case "ACCEPTED":
        return {
          icon: <FaCheckCircle className="text-green-500 text-9xl mb-4" />,
          text: "Congratulations! Your nomination has been accepted.",
          color: "text-green-700",
        };
      case "REJECTED":
        return {
          icon: <FaTimesCircle className="text-red-500 text-9xl mb-4" />,
          text: "We're sorry, but your nomination has been rejected.",
          color: "text-red-700",
        };
      default:
        return {
          icon: <MdPending className="text-yellow-500 text-9xl mb-4" />,
          text: "The status of your nomination is pending.",
          color: "text-yellow-700",
        };
    }
  };

  const { icon, text, color } = getStatusInfo();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <div className="bg-white rounded-lg shadow-xl p-12 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">{formData.name}</h1>
        <p className="text-xl text-gray-600 mb-8">{formData.description}</p>
        <div className="flex flex-col items-center justify-center">
          {icon}
          <p className={`text-2xl font-semibold ${color} mb-4`}>{status}</p>
          <p className="text-xl">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default NominationStatus;
