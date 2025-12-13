import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema, type CampaignFormValues } from "../schemas/campaignSchema";
import { createCampaign } from "../services/api";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { WithContext as ReactTags } from "react-tag-input";

export const CampaignForm = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: { name: "", budget: 0, keywords: [] },
  });

  const onSubmit = async (data: CampaignFormValues) => {
    setLoading(true);
    try {
      await createCampaign({ 
        name: data.name, 
        budget: data.budget, 
        keywords: data.keywords.join(",") 
      });
      queryClient.invalidateQueries(["campaigns"]);
      reset();
      toast.success("¡Campaña creada con éxito!");
    } catch (err) {
      toast.error("Error al crear la campaña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md sm:max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 sm:mt-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center">
        Crear Campaña
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Nombre</label>
          <input
            {...control.register("name")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Presupuesto</label>
          <input
            type="number"
            {...control.register("budget", { valueAsNumber: true })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
          />
          {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Keywords</label>
          <Controller
            control={control}
            name="keywords"
            render={({ field }) => (
              <div className="border rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-blue-400 transition-shadow shadow-sm">
                <ReactTags
                  tags={field.value.map((k, idx) => ({
                    id: idx.toString(),
                    text: k,
                    className: "bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-1 mb-1 inline-block text-sm"
                  }))}
                  handleDelete={(i) =>
                    field.onChange(field.value.filter((_, idx) => idx !== i))
                  }
                  handleAddition={(tag) => field.onChange([...field.value, tag.text])}
                  inputFieldPosition="bottom"
                  autocomplete
                  placeholder="Escribe y presiona enter"
                  classNames={{
                    tagInputField: "px-2 py-1 w-full focus:outline-none",
                    tagInput: "flex flex-wrap items-center",
                  }}
                />
              </div>
            )}
          />
          {errors.keywords && <p className="text-red-500 text-sm mt-1">{errors.keywords.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
        >
          {loading ? "Creando..." : "Crear Campaña"}
        </button>
      </form>
    </div>
  );
};
