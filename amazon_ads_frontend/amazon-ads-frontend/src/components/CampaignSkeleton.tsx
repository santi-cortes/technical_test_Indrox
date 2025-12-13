export const CampaignSkeleton = () => (
  <tbody>
    {Array.from({ length: 5 }).map((_, i) => (
      <tr key={i} className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} animate-pulse`}>
        <td className="py-2 px-3 sm:px-4"><div className="h-4 bg-gray-200 rounded w-3/4"></div></td>
        <td className="py-2 px-3 sm:px-4"><div className="h-4 bg-gray-200 rounded w-1/2"></div></td>
        <td className="py-2 px-3 sm:px-4"><div className="h-4 bg-gray-200 rounded w-full"></div></td>
        <td className="py-2 px-3 sm:px-4"><div className="h-4 bg-gray-200 rounded w-1/3"></div></td>
        <td className="py-2 px-3 sm:px-4"><div className="h-4 bg-gray-200 rounded w-1/4"></div></td>
      </tr>
    ))}
  </tbody>
);
