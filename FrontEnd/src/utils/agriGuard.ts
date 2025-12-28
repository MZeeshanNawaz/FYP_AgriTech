const keywords = [
  "crop","wheat","rice","corn","leaf","disease","spray",
  "fertilizer","soil","agriculture","fasal","zameen","plants","land","pesticides"
];

export const isAgriQuestion = (text: string) =>
  keywords.some(k => text.toLowerCase().includes(k));
