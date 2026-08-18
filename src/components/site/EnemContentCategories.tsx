import {
  Calculator,
  CalendarClock,
  ClipboardCheck,
  FlaskConical,
  Landmark,
  Languages,
  ListChecks,
  NotebookPen,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ContentCategory = {
  icon: LucideIcon;
  title: string;
  description: string;
  subcategories?: string[];
};

const categories: ContentCategory[] = [
  {
    icon: ListChecks,
    title: "Questões e Exercícios",
    description:
      "Pratique com diferentes materiais de questões e exercícios para reforçar seus estudos.",
  },
  {
    icon: PenLine,
    title: "Redação",
    description: "Materiais de apoio para estudar e revisar redação para o ENEM.",
  },
  {
    icon: Calculator,
    title: "Matemática",
    description: "Materiais para revisar matemática e praticar questões.",
  },
  {
    icon: FlaskConical,
    title: "Ciências da Natureza",
    description: "Materiais para revisar os principais conteúdos das Ciências da Natureza.",
    subcategories: ["Física", "Química", "Biologia"],
  },
  {
    icon: Landmark,
    title: "Ciências Humanas",
    description: "Materiais de apoio para revisão das Ciências Humanas.",
    subcategories: ["Filosofia", "Sociologia"],
  },
  {
    icon: Languages,
    title: "Linguagens",
    description: "Materiais para revisão e prática na área de Linguagens.",
    subcategories: ["Gramática", "Língua Portuguesa"],
  },
  {
    icon: ClipboardCheck,
    title: "Simulados e Provas",
    description: "Materiais para praticar em formato de prova e testar seus conhecimentos.",
  },
  {
    icon: NotebookPen,
    title: "Resumos e Revisão",
    description: "Materiais para revisar conteúdos de forma rápida antes da prova.",
    subcategories: ["Resumos", "Memorex", "Mapas mentais", "Fichas de revisão"],
  },
  {
    icon: CalendarClock,
    title: "Cronogramas e Organização",
    description: "Materiais para ajudar você a organizar sua rotina de estudos.",
  },
];

export function EnemContentCategories({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {categories.map(({ icon: Icon, title, description, subcategories }) => (
        <div key={title} className="rounded-2xl border border-border/70 bg-card p-6">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/12 text-brand-strong">
            <Icon className="size-4" />
          </span>
          <h3 className="mt-4 text-base font-bold text-foreground">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
          {subcategories ? (
            <p className="mt-3 text-xs font-medium text-muted-foreground/80">
              {subcategories.join(" · ")}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
