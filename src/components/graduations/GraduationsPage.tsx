"use client";

import { useState, useMemo } from "react";
import { Camera, GraduationCap } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { GraduationEvent } from "@/types/course";

interface GraduationsPageProps {
  graduations: GraduationEvent[];
}

const typeColors: Record<string, string> = {
  informatica: "#1B1464",
  ingles: "#FF1493",
  administracao: "#16A34A",
  saude: "#FF6600",
  beleza: "#6600FF",
  tecnologia: "#7C3AED",
};

function typeLabel(tipo: string): string {
  const labels: Record<string, string> = {
    informatica: "Informatica",
    ingles: "Ingles",
    administracao: "Administracao",
    saude: "Saude",
    beleza: "Beleza",
    tecnologia: "Tecnologia",
  };
  return labels[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1);
}

export function GraduationsPage({ graduations }: GraduationsPageProps) {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [lightbox, setLightbox] = useState<{
    photos: string[];
    index: number;
  } | null>(null);

  // Extract unique types from data
  const types = useMemo(() => {
    const uniqueTypes = Array.from(new Set(graduations.map((g) => g.tipo)));
    return uniqueTypes.sort();
  }, [graduations]);

  // Filtered graduations
  const filtered = useMemo(() => {
    if (activeFilter === "todos") return graduations;
    return graduations.filter((g) => g.tipo === activeFilter);
  }, [graduations, activeFilter]);

  function openLightbox(photos: string[], index: number) {
    setLightbox({ photos, index });
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--color-brand-navy)" }}
          >
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-navy)] dark:text-white">
            Galeria de Formaturas
          </h1>
        </div>
        <p className="text-[var(--color-foreground-muted)] max-w-2xl leading-relaxed">
          Celebrando as conquistas dos nossos alunos
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveFilter("todos")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === "todos"
              ? "bg-[var(--color-brand-navy)] text-white shadow-md"
              : "bg-[var(--color-background-alt)] text-[var(--color-foreground-muted)] hover:bg-[var(--color-border)]"
          }`}
        >
          Todos
        </button>
        {types.map((tipo) => (
          <button
            key={tipo}
            onClick={() => setActiveFilter(tipo)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === tipo
                ? "text-white shadow-md"
                : "bg-[var(--color-background-alt)] text-[var(--color-foreground-muted)] hover:bg-[var(--color-border)]"
            }`}
            style={
              activeFilter === tipo
                ? { backgroundColor: typeColors[tipo] || "var(--color-brand-navy)" }
                : undefined
            }
          >
            {typeLabel(tipo)}
          </button>
        ))}
      </div>

      {/* Graduation events */}
      {filtered.length > 0 ? (
        <div className="space-y-12">
          {filtered.map((event, eventIndex) => (
            <div
              key={`${event.titulo}-${eventIndex}`}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden"
            >
              {/* Event header */}
              <div className="p-5 md:p-6 border-b border-[var(--color-border)]">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-lg md:text-xl font-bold text-[var(--color-foreground)]">
                    {event.titulo}
                  </h2>
                  <Badge
                    variant="category"
                    color={typeColors[event.tipo] || "var(--color-foreground-muted)"}
                    size="md"
                  >
                    {typeLabel(event.tipo)}
                  </Badge>
                </div>
                <p className="text-sm text-[var(--color-foreground-muted)] mb-3">
                  {formatDate(event.data)}
                </p>
                <p className="text-[var(--color-foreground-muted)] leading-relaxed">
                  {event.descricao}
                </p>
              </div>

              {/* Photo grid */}
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {event.fotos.map((foto, fotoIndex) => (
                    <button
                      key={fotoIndex}
                      onClick={() => openLightbox(event.fotos, fotoIndex)}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-[var(--color-background-alt)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)] focus:ring-offset-2"
                      aria-label={`Abrir foto ${fotoIndex + 1} de ${event.titulo}`}
                    >
                      {/* Placeholder - colored div with Camera icon */}
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-200 group-hover:scale-105"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${
                            typeColors[event.tipo] || "var(--color-brand-navy)"
                          }, transparent 85%)`,
                        }}
                      >
                        <Camera
                          className="h-8 w-8 opacity-40"
                          style={{
                            color: typeColors[event.tipo] || "var(--color-brand-navy)",
                          }}
                        />
                        <span
                          className="text-xs font-medium opacity-50"
                          style={{
                            color: typeColors[event.tipo] || "var(--color-brand-navy)",
                          }}
                        >
                          Foto {fotoIndex + 1}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center mb-4">
            <Camera className="h-7 w-7 text-[var(--color-foreground-muted)]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
            Nenhuma formatura encontrada
          </h3>
          <p className="text-sm text-[var(--color-foreground-muted)] max-w-sm">
            Nao ha formaturas para este filtro. Selecione outro tipo ou veja
            todos.
          </p>
          <button
            onClick={() => setActiveFilter("todos")}
            className="mt-4 text-sm font-medium text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)] hover:underline"
          >
            Ver todas as formaturas
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          initialIndex={lightbox.index}
          currentIndex={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox({ ...lightbox, index })}
        />
      )}
    </div>
  );
}
