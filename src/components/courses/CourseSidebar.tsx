import { Course } from "@/types/course";
import { Calendar, Users, Phone, MessageCircle, CreditCard, Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { formatCurrency, formatDate } from "@/lib/utils";
import { siteConfig } from "@/data/site";

interface CourseSidebarProps {
  course: Course;
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  const whatsappUrl = buildWhatsAppUrl({
    type: "course",
    courseName: course.nome,
  });

  const { investimento } = course;

  return (
    <div className="sticky top-24">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] shadow-[var(--shadow-lg)] overflow-hidden">
        {/* Investment header */}
        <div className="bg-[var(--color-brand-navy)] p-6 text-white">
          <h3 className="text-sm font-medium uppercase tracking-wider opacity-80 mb-1">
            Investimento
          </h3>

          {/* Matricula */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-sm opacity-80">Matricula:</span>
            <span className="text-2xl font-bold">
              {formatCurrency(investimento.matricula)}
            </span>
          </div>

          {/* Parcelas */}
          {investimento.parcelas > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4 opacity-80" />
              <span>
                {investimento.valor_parcela
                  ? `${investimento.parcelas}x de ${formatCurrency(investimento.valor_parcela)}`
                  : `Ate ${investimento.parcelas}x`}
              </span>
            </div>
          )}

          {/* Bonus pontualidade */}
          {investimento.bonus_pontualidade > 0 && (
            <div className="flex items-center gap-2 text-sm mt-2 text-[var(--color-brand-green)]">
              <Gift className="h-4 w-4" />
              <span>
                Bonus pontualidade: {formatCurrency(investimento.bonus_pontualidade)}/mes
              </span>
            </div>
          )}

          {/* Desconto maximo */}
          {investimento.desconto_maximo && (
            <div className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-sm text-center">
              Desconto de ate{" "}
              <span className="font-bold text-[var(--color-brand-green)]">
                {investimento.desconto_maximo}
              </span>
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="p-6 space-y-4">
          {/* Proxima turma */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-foreground-muted)]">
                Proxima turma
              </p>
              <p className="font-semibold text-sm text-[var(--color-foreground)]">
                {formatDate(course.proxima_turma)}
              </p>
            </div>
          </div>

          {/* Vagas */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/30">
              <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-[var(--color-foreground-muted)]">
                Vagas disponiveis
              </p>
              <p className="font-semibold text-sm text-[var(--color-foreground)]">
                {course.vagas} vagas
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[var(--color-border)]" />

          {/* WhatsApp CTA */}
          <Button
            variant="whatsapp"
            size="lg"
            href={whatsappUrl}
            className="w-full shadow-[var(--shadow-wa)]"
          >
            <MessageCircle className="h-5 w-5" />
            Quero me matricular
          </Button>

          {/* Phone link */}
          <Button
            variant="outline"
            size="md"
            href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
            className="w-full"
          >
            <Phone className="h-4 w-4" />
            Ligar agora
          </Button>
        </div>
      </div>
    </div>
  );
}
