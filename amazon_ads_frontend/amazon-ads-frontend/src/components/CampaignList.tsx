// components/CampaignList.tsx
import { useState, useMemo } from "react";
import { useCampaigns } from "../hooks/useCampaigns";
import { CampaignListHeader } from "./CampaignListHeader";
import { CampaignTable } from "./CampaignTable";
import { CampaignSkeleton } from "./CampaignSkeleton";
import { CampaignSearch } from "./CampaignSearch";
import { Pagination } from "./Pagination";

export const CampaignList = () => {
  const { data: campaigns = [], isLoading, error, refetch, isFetching } = useCampaigns();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleRefetch = () => {
    setIsButtonDisabled(true);
    refetch();
    setTimeout(() => setIsButtonDisabled(false), 2000); 
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, campaigns]);

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const paginatedCampaigns = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredCampaigns]);

  if (error) {
    return (
      <div className="text-center text-red-500 mt-6 text-sm sm:text-base">
        Error al cargar campañas
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
      <CampaignListHeader onRefetch={handleRefetch} isButtonDisabled={isButtonDisabled} isFetching={isFetching} />
      <CampaignSearch onSearch={handleSearch} />
      <CampaignTable campaigns={paginatedCampaigns} isLoading={isLoading} renderSkeleton={CampaignSkeleton} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
