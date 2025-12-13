import { FiRefreshCcw } from "react-icons/fi";

type Props = {
  onRefetch: () => void;
  isButtonDisabled: boolean;
  isFetching: boolean;
};

export const CampaignListHeader = ({ onRefetch, isButtonDisabled, isFetching }: Props) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
        Listado de Campañas
      </h2>
      <button
        onClick={onRefetch}
        disabled={isButtonDisabled || isFetching}
        className={`flex items-center justify-center gap-2 bg-blue-500 ${isButtonDisabled || isFetching ? 'cursor-wait' : 'hover:bg-blue-600'} text-white px-4 py-2 rounded-lg shadow-lg transition-all transform duration-200 ease-in-out hover:scale-105`}
      >
        <FiRefreshCcw className={`text-xl ${isButtonDisabled || isFetching ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};
