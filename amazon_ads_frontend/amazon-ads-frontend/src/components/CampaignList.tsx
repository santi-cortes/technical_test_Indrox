import { useCampaigns } from "../hooks/useCampaigns";
import type { Campaign } from "../types/Campaign";

export const CampaignList = () => {
  const { data: campaigns = [], isLoading, error } = useCampaigns();

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800";
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Skeleton loader
  const renderSkeleton = () => (
    <tbody>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} animate-pulse`}>
          <td className="py-2 px-3 sm:px-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
          <td className="py-2 px-3 sm:px-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td className="py-2 px-3 sm:px-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </td>
          <td className="py-2 px-3 sm:px-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </td>
          <td className="py-2 px-3 sm:px-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  if (error)
    return (
      <div className="text-center text-red-500 mt-6 text-sm sm:text-base">
        Error al cargar campañas
      </div>
    );

  return (
    <div className="mt-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center sm:text-left">
        Listado de Campañas
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm sm:text-base">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-3 sm:px-4 text-left">Nombre</th>
              <th className="py-2 px-3 sm:px-4 text-left">Presupuesto</th>
              <th className="py-2 px-3 sm:px-4 text-left">Keywords</th>
              <th className="py-2 px-3 sm:px-4 text-left">Status</th>
              <th className="py-2 px-3 sm:px-4 text-left">ID Externo</th>
            </tr>
          </thead>
          {isLoading ? (
            renderSkeleton()
          ) : (
            <tbody>
              {campaigns.map((c: Campaign, i: number) => (
                <tr
                  key={c.id}
                  className={`${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors duration-300`}
                >
                  <td className="py-2 px-3 sm:px-4 font-medium">{c.name}</td>
                  <td className="py-2 px-3 sm:px-4">${Number(c.budget).toFixed(2)}</td>
                  <td className="py-2 px-3 sm:px-4">{c.keywords}</td>
                  <td className="py-2 px-3 sm:px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusBadge(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 sm:px-4">{c.external_id || "—"}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
