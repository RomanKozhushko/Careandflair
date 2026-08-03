import type { ReactNode } from "react";
import type { AdminResourceKey } from "@/admin/resources";

export type EditableResourceKey = AdminResourceKey;
export type EditablePath = Array<string | number>;

export type EditableButtonConfig = {
  id: string;
  resource: EditableResourceKey;
  label: string;
  href: string;
  labelPath: EditablePath;
  hrefPath: EditablePath;
  className: string;
  variant: "primary" | "secondary" | "whatsapp" | "ghost" | "link";
  icon?: ReactNode;
};

export type EditableImageConfig = {
  resource: EditableResourceKey;
  path: EditablePath;
  value?: string;
  label: string;
  children: ReactNode;
};

export type EditableSectionActions = {
  resource: EditableResourceKey;
  index: number;
  canDuplicate?: boolean;
};

export type VisualEditorAdapter = {
  section: (id: string, label: string, children: ReactNode, actions?: EditableSectionActions) => ReactNode;
  text: (resource: EditableResourceKey, path: EditablePath, value: string) => ReactNode;
  button: (config: EditableButtonConfig) => ReactNode;
  image: (config: EditableImageConfig) => ReactNode;
};
