export const quoteRequestStatuses = ["new", "contacted", "quoted", "booked", "completed", "lost"] as const;

export type QuoteRequestStatus = (typeof quoteRequestStatuses)[number];

export type QuoteRequestPayload = {
  name?: string;
  phone?: string;
  email?: string;
  postcode?: string;
  address_optional?: string;
  service_type?: string;
  selected_package?: string;
  property_category?: string;
  property_type?: string;
  selected_problems?: unknown;
  selected_upgrades?: unknown;
  estimated_price?: number | null;
  deadline?: string;
  message?: string;
  source_page?: string;
};

export type QuoteRequestRecord = Required<Pick<QuoteRequestPayload, "name">> &
  QuoteRequestPayload & {
    id: string;
    created_at: string;
    updated_at?: string;
    status: QuoteRequestStatus;
    admin_notes?: string | null;
  };

export function isQuoteRequestStatus(value: unknown): value is QuoteRequestStatus {
  return typeof value === "string" && quoteRequestStatuses.includes(value as QuoteRequestStatus);
}

function cleanString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function cleanJsonValue(value: unknown): unknown {
  return value === undefined ? null : value;
}

export function normalizeQuoteRequestPayload(payload: unknown) {
  const input = payload && typeof payload === "object" && !Array.isArray(payload) ? (payload as QuoteRequestPayload) : {};

  const name = cleanString(input.name);
  const phone = cleanString(input.phone);
  const email = cleanString(input.email);
  const selectedPackage = cleanString(input.selected_package);
  const serviceType = cleanString(input.service_type);
  const estimatedPrice = typeof input.estimated_price === "number" && Number.isFinite(input.estimated_price) ? input.estimated_price : null;

  const errors: string[] = [];
  if (!name) errors.push("Name is required.");
  if (!phone && !email) errors.push("Phone or email is required.");
  if (!selectedPackage && !serviceType) errors.push("Service type or selected package is required.");

  return {
    errors,
    data: {
      status: "new" satisfies QuoteRequestStatus,
      name,
      phone,
      email,
      postcode: cleanString(input.postcode),
      address_optional: cleanString(input.address_optional),
      service_type: serviceType,
      selected_package: selectedPackage,
      property_category: cleanString(input.property_category),
      property_type: cleanString(input.property_type),
      selected_problems: cleanJsonValue(input.selected_problems),
      selected_upgrades: cleanJsonValue(input.selected_upgrades),
      estimated_price: estimatedPrice,
      deadline: cleanString(input.deadline),
      message: cleanString(input.message),
      source_page: cleanString(input.source_page) ?? "quote-builder",
    },
  };
}
