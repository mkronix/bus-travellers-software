
export interface City {
  id: number;
  name: string;
  code: string;
  state: string;
  isActive: boolean;
}

export const GUJARATI_CITIES: City[] = [
  { id: 1, name: "Ahmedabad", code: "AMD", state: "Gujarat", isActive: true },
  { id: 2, name: "Anand", code: "ANA", state: "Gujarat", isActive: true },
  { id: 3, name: "Ankleshwar", code: "ANK", state: "Gujarat", isActive: true },
  { id: 4, name: "Bharuch", code: "BHR", state: "Gujarat", isActive: true },
  { id: 5, name: "Chhapi", code: "CHP", state: "Gujarat", isActive: true },
  { id: 6, name: "Chhatral", code: "CHT", state: "Gujarat", isActive: true },
  { id: 7, name: "Deesa", code: "DEE", state: "Gujarat", isActive: true },
  { id: 8, name: "Kalol", code: "KLO", state: "Gujarat", isActive: true },
  { id: 9, name: "Kanodar", code: "KAN", state: "Gujarat", isActive: true },
  { id: 10, name: "Koita", code: "KOI", state: "Gujarat", isActive: true },
  { id: 11, name: "Mehsana", code: "MEH", state: "Gujarat", isActive: true },
  { id: 12, name: "Nadiad", code: "NAD", state: "Gujarat", isActive: true },
  { id: 13, name: "Nandasan", code: "NAN", state: "Gujarat", isActive: true },
  { id: 14, name: "Navsari", code: "NAV", state: "Gujarat", isActive: true },
  { id: 15, name: "Palanpur", code: "PAL", state: "Gujarat", isActive: true },
  { id: 16, name: "Patan", code: "PAT", state: "Gujarat", isActive: true },
  { id: 17, name: "Siddhpur", code: "SID", state: "Gujarat", isActive: true },
  { id: 18, name: "Surat", code: "SUR", state: "Gujarat", isActive: true },
  { id: 19, name: "Unava", code: "UNA", state: "Gujarat", isActive: true },
  { id: 20, name: "Unjha", code: "UNJ", state: "Gujarat", isActive: true }
];

export const getCityByName = (name: string): City | undefined => {
  return GUJARATI_CITIES.find(city => city.name.toLowerCase() === name.toLowerCase());
};

export const getCityById = (id: number): City | undefined => {
  return GUJARATI_CITIES.find(city => city.id === id);
};
