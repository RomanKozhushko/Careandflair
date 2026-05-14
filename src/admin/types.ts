export type JsonPrimitive = string | number | boolean | null | undefined;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };
export type JsonRecord = { [key: string]: JsonValue };

export type AdminSection = {
  id: string;
  label: string;
  description: string;
  fileName: string;
  status: "live" | "mock" | "coming-soon";
  items: JsonValue;
  previewFields?: string[];
};
