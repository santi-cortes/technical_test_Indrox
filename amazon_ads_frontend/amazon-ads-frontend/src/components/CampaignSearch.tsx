import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export const CampaignSearch = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Buscar campañas..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
};
