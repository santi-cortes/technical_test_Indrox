import { useQuery } from "react-query";
import { getCampaigns } from "../services/api";

export const useCampaigns = () =>
  useQuery(["campaigns"], getCampaigns, {
    refetchInterval: 5000,
  });
