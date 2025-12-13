import type { JSX } from "react";
import type { Campaign } from "../types/Campaign";
import { CampaignStatusBadge } from "./CampaignStatusBadge";

type Props = {
  campaigns: Campaign[];
  isLoading: boolean;
  renderSkeleton: () => JSX.Element;
};

export const CampaignTable = ({ campaigns, isLoading, renderSkeleton }: Props) => {
  return (
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
        {isLoading ? renderSkeleton() : (
          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-blue-50 transition-colors duration-300"
              >
                <td className="py-2 px-3 sm:px-4 font-medium">{c.name}</td>
                <td className="py-2 px-3 sm:px-4">${Number(c.budget).toFixed(2)}</td>
                <td className="py-2 px-3 sm:px-4">{c.keywords}</td>
                <td className="py-2 px-3 sm:px-4">
                  <CampaignStatusBadge status={c.status} />
                </td>
                <td className="py-2 px-3 sm:px-4">{c.external_id || "—"}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
