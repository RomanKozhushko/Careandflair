import type { JsonRecord, JsonValue } from "@/admin/types";

type AdminDataTableProps = {
  items: JsonValue;
  fields?: string[];
};

function asRecords(items: JsonValue): JsonRecord[] {
  if (Array.isArray(items)) return items.filter((item): item is JsonRecord => Boolean(item) && typeof item === "object" && !Array.isArray(item));
  if (items && typeof items === "object") {
    return Object.entries(items).map(([key, value]) => ({ key, value: summarise(value) }));
  }
  return [{ value: items }];
}

function summarise(value: JsonValue | undefined): string {
  if (value === undefined) return "—";
  if (value === null) return "null";
  if (Array.isArray(value)) return `${value.length} items`;
  if (typeof value === "object") return `${Object.keys(value).length} fields`;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function inferFields(records: JsonRecord[], explicitFields?: string[]): string[] {
  if (explicitFields?.length) return explicitFields;
  const fields = new Set<string>();
  records.slice(0, 4).forEach((record) => Object.keys(record).slice(0, 5).forEach((key) => fields.add(key)));
  return Array.from(fields).slice(0, 5);
}

export function AdminDataTable({ items, fields }: AdminDataTableProps) {
  const records = asRecords(items).slice(0, 8);
  const columns = inferFields(records, fields);

  if (records.length === 0) {
    return <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No local JSON records found.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            <tr>{columns.map((column) => <th key={column} className="px-4 py-3">{column}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {records.map((record, index) => (
              <tr key={`${record.id ?? record.key ?? index}`}>
                {columns.map((column) => <td key={column} className="max-w-xs px-4 py-3 align-top">{summarise(record[column])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
