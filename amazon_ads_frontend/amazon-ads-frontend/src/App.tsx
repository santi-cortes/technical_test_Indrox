import { CampaignForm } from "./components/CampaignForm";
import { CampaignList } from "./components/CampaignList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Campañas Amazon Ads
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Administra y monitorea tus campañas de forma simulada
          </p>
        </header>

        <CampaignForm />
        <div className="flex flex-col justify-center lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <CampaignList />
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
