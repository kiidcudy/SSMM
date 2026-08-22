import type { PanelService } from "@/lib/data/catalog";
import { countLines, fieldsForService } from "@/lib/provider/service-fields";

const STATUS_LABELS: Record<string, string> = {
  awaiting: "Awaiting",
  pending: "Pending",
  in_progress: "In progress",
  completed: "Completed",
  partial: "Partial",
  canceled: "Canceled",
  processing: "Processing",
  fail: "Fail",
  error: "Error",
  refunded: "Refunded",
  rejected: "Rejected",
};

export function formatApiStatus(status: string): string {
  const key = status.toLowerCase().replace(/\s+/g, "_");
  return STATUS_LABELS[key] || status.charAt(0).toUpperCase() + status.slice(1);
}

export type AddOrderParams = Record<string, string>;

export type PreparedAddOrder =
  | { ok: true; quantity: number; params: AddOrderParams }
  | { ok: false; error: string };

export function prepareAddOrder(
  service: PanelService,
  params: AddOrderParams,
): PreparedAddOrder {
  const fields = fieldsForService(service);
  let quantity = Number(params.quantity || service.min || 1);

  if (fields.quantityFromComments) {
    const lines = countLines(params.comments || "");
    if (lines < 1) return { ok: false, error: "Comments required" };
    quantity = lines;
  }

  if (fields.needsLink && !params.link?.trim()) {
    return { ok: false, error: "Link required" };
  }

  if (service.type === "subscriptions" && !params.username?.trim()) {
    return { ok: false, error: "Username required" };
  }

  if (fields.needsQuantity || fields.quantityFromComments) {
    if (quantity < service.min || quantity > service.max) {
      return { ok: false, error: "Quantity out of range" };
    }
  } else {
    quantity = Math.max(1, service.min || 1);
  }

  if (fields.extras.includes("comments") && !countLines(params.comments || "")) {
    return { ok: false, error: "Comments required" };
  }
  if (fields.extras.includes("username") && !params.username?.trim()) {
    return { ok: false, error: "Username required" };
  }
  if (fields.extras.includes("keywords") && !params.keywords?.trim()) {
    return { ok: false, error: "Keywords required" };
  }
  if (fields.extras.includes("usernames") && !params.usernames?.trim()) {
    return { ok: false, error: "Usernames required" };
  }
  if (fields.extras.includes("hashtag") && !params.hashtag?.trim()) {
    return { ok: false, error: "Hashtag required" };
  }
  if (fields.extras.includes("media") && !params.media?.trim()) {
    return { ok: false, error: "Media URL required" };
  }
  if (fields.extras.includes("groups") && !params.groups?.trim()) {
    return { ok: false, error: "Groups required" };
  }
  if (
    fields.extras.includes("answer_number") &&
    (params.answer_number === undefined || params.answer_number === "")
  ) {
    return { ok: false, error: "Poll answer number required" };
  }

  return { ok: true, quantity, params };
}
