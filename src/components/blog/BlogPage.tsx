"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Newspaper,
  Search,
  X,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Monitor,
  Globe,
  Briefcase,
  Lightbulb,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { BlogPost, BlogCategory, BlogCategoryInfo } from "@/types/blog";

interface BlogPageProps {
  posts: BlogPost[];
  categories: BlogCategoryInfo[];
  allTags: { tag: string; count: number }[];
  initialCategory?: BlogCategory | "all";
  initialTag?: string;
  pageTitle?: string;
  pageDescription?: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  Monitor,
  Globe,
  Briefcase,
  Lightbulb,
  Newspaper,
};

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export function BlogPage({
  posts,
  categories,
  allTags,
  initialCategory = "all",
  initialTag,
  pageTitle = "Blog",
  pageDescription,
}: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const categoriesWithCount = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      count: posts.filter((p) => p.category === cat.slug).length,
    }));
  }, [categories, posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (activeCategory !== "all") {
      result = result.filter((post) => post.category === activeCategory);
    }

    if (initialTag) {
      result = result.filter((post) => post.tags.includes(initialTag));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [posts, activeCategory, searchQuery, initialTag]);

  const recentPosts = useMemo(() => posts.slice(0, 3), [posts]);

  return (
    <div>
      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--color-brand-navy)" }}
          >
            <Newspaper className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-brand-navy)] dark:text-white">
            {pageTitle}
          </h1>
        </div>
        <p className="text-[var(--color-foreground-muted)] max-w-2xl leading-relaxed">
          {pageDescription ||
            "Dicas, novidades e conteudos para impulsionar sua carreira e aprendizado."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search */}
          <div className="relative w-full max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-foreground-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artigos..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-navy)] focus:border-transparent transition-all duration-200"
              aria-label="Buscar artigos"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] transition-colors"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          {!initialTag && (
            <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filtrar por categoria">
              <button
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-navy)]",
                  activeCategory === "all"
                    ? "bg-[var(--color-brand-navy)] text-white shadow-sm"
                    : "border border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:border-[var(--color-brand-navy)] hover:text-[var(--color-brand-navy)]"
                )}
                aria-pressed={activeCategory === "all"}
              >
                Todos
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full min-w-[22px] text-center",
                    activeCategory === "all"
                      ? "bg-white/20"
                      : "bg-[var(--color-background-alt)]"
                  )}
                >
                  {posts.length}
                </span>
              </button>

              {categoriesWithCount.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                      isActive
                        ? "text-white shadow-sm"
                        : "border border-[var(--color-border)] text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]"
                    )}
                    style={
                      isActive
                        ? { backgroundColor: cat.corHex }
                        : undefined
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = cat.corHex;
                        (e.currentTarget as HTMLElement).style.color = cat.corHex;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.borderColor = "";
                        (e.currentTarget as HTMLElement).style.color = "";
                      }
                    }}
                    aria-pressed={isActive}
                  >
                    {cat.nome}
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full min-w-[22px] text-center",
                        isActive
                          ? "bg-white/20"
                          : "bg-[var(--color-background-alt)]"
                      )}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Result counter */}
          <p className="mb-6 text-sm text-[var(--color-foreground-muted)]">
            Mostrando{" "}
            <span className="font-semibold text-[var(--color-foreground)]">
              {filteredPosts.length}
            </span>{" "}
            {filteredPosts.length === 1 ? "artigo" : "artigos"}
          </p>

          {/* Post grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} categories={categories} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center mb-4">
                <Newspaper className="h-7 w-7 text-[var(--color-foreground-muted)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-sm text-[var(--color-foreground-muted)] max-w-sm">
                {searchQuery
                  ? `Nao encontramos artigos para "${searchQuery}". Tente outra busca ou limpe os filtros.`
                  : "Nao ha artigos disponiveis com os filtros selecionados."}
              </p>
              {(searchQuery || activeCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 text-sm font-medium text-[var(--color-brand-navy)] dark:text-[var(--color-brand-green)] hover:underline"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">
          {/* Categories */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] dark:bg-[#1a1a1a] p-5">
            <h3 className="font-semibold text-[var(--color-foreground)] mb-4">Categorias</h3>
            <ul className="space-y-2">
              {categoriesWithCount.map((cat) => {
                const IconComp = categoryIcons[cat.icone] || Newspaper;
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/blog/categoria/${cat.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[var(--color-foreground-muted)] hover:bg-[var(--color-background-alt)] transition-colors group"
                    >
                      <IconComp className="h-4 w-4 flex-shrink-0" style={{ color: cat.corHex }} />
                      <span className="flex-1 group-hover:text-[var(--color-foreground)] transition-colors">
                        {cat.nome}
                      </span>
                      <span className="text-xs bg-[var(--color-background-alt)] dark:bg-[#252525] rounded-full px-2 py-0.5">
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tags */}
          {allTags.length > 0 && (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] dark:bg-[#1a1a1a] p-5">
              <h3 className="font-semibold text-[var(--color-foreground)] mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(({ tag, count }) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-foreground-muted)] hover:border-[var(--color-brand-navy)] hover:text-[var(--color-brand-navy)] dark:hover:border-[var(--color-brand-green)] dark:hover:text-[var(--color-brand-green)] transition-colors",
                      count >= 2 ? "font-medium" : ""
                    )}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent posts */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] dark:bg-[#1a1a1a] p-5">
            <h3 className="font-semibold text-[var(--color-foreground)] mb-4">Posts Recentes</h3>
            <ul className="space-y-4">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <p className="text-sm font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-brand-navy)] dark:group-hover:text-[var(--color-brand-green)] transition-colors line-clamp-2">
                      {post.title}
                    </p>
                    <p className="text-xs text-[var(--color-foreground-muted)] mt-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ——— Blog Card ——— */
interface BlogCardProps {
  post: BlogPost;
  categories: BlogCategoryInfo[];
  index: number;
}

function BlogCard({ post, categories, index }: BlogCardProps) {
  const category = categories.find((c) => c.slug === post.category);
  const categoryColor = category?.corHex || "#6B7280";
  const categoryName = category?.nome || post.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)] hover:shadow-lg transition-all duration-200 overflow-hidden"
      >
        {/* Thumbnail placeholder */}
        <div
          className="h-36 w-full flex items-center justify-center"
          style={{ backgroundColor: `${categoryColor}15` }}
        >
          <Newspaper className="h-10 w-10" style={{ color: `${categoryColor}60` }} />
        </div>

        <div className="flex flex-col flex-1 p-5">
          {/* Category badge */}
          <div className="mb-3">
            <Badge variant="category" color={categoryColor} size="sm">
              {categoryName}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base leading-snug text-[var(--color-foreground)] group-hover:text-[var(--color-brand-navy)] dark:group-hover:text-white transition-colors mb-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed flex-1 mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-[var(--color-foreground-muted)] mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min
            </span>
          </div>

          {/* Author + CTA */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-[var(--color-foreground-muted)]">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
            <span
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: categoryColor }}
            >
              Ler
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
