import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

const handleDatabaseOperation = async (operation, table, data, id = null) => {
  try {
    const { error } = id
      ? await supabase.from(table).update(data).eq("id", id)
      : await supabase.from(table).insert(data);

    if (error) throw error;
  } catch (error) {
    console.log(`Erro na operação ${operation} em ${table}:`, error.message);
  }
};

export const DataProvider = ({ children }) => {
  const [babyData, setBabyData] = useState({
    name: "Bebê",
    weight: "-",
    length: "-",
  });

  const saveData = (table, data) =>
    handleDatabaseOperation("inserir", table, data);
  const updateData = (table, id, data) =>
    handleDatabaseOperation("atualizar", table, data, id);

  const saveSleepData = (data) => saveData("sleep", data);
  const saveFeedData = (data) => saveData("eat", data);
  const saveDiaperData = (data) => saveData("diaper", data);

  const updateSleepData = (id, data) => updateData("sleep", id, data);
  const updateFeedData = (id, data) => updateData("eat", id, data);
  const updateDiaperData = (id, data) => updateData("diaper", id, data);

  const fetchData = async (table) => {
    try {
      const { data, error } = await supabase.from(table).select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Erro ao buscar dados de ${table}:`, error.message);
      return [];
    }
  };

  const getSleepData = () => fetchData("sleep");
  const getFeedData = () => fetchData("eat");
  const getDiaperData = () => fetchData("diaper");

  const deleteData = async (table, id) => {
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    } catch (error) {
      console.log(`Erro ao excluir dados de ${table}:`, error.message);
    }
  };

  const deleteSleepData = (id) => deleteData("sleep", id);
  const deleteFeedData = (id) => deleteData("eat", id);
  const deleteDiaperData = (id) => deleteData("diaper", id);

  const getBabyData = () => babyData;

  const updateBabyData = (newData) => {
    setBabyData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <DataContext.Provider
      value={{
        saveSleepData,
        saveFeedData,
        saveDiaperData,

        updateSleepData,
        updateFeedData,
        updateDiaperData,

        getSleepData,
        getFeedData,
        getDiaperData,

        deleteSleepData,
        deleteFeedData,
        deleteDiaperData,

        getBabyData,
        updateBabyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
