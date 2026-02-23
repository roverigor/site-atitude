import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  Calendar,
  Clock,
  User,
  Newspaper,
} from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { getBlogCategoryBySlug } from "@/data/blog-categories";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { ShareButtons } from "@/components/blog/ShareButtons";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artigo nao encontrado" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Blog Atitude Ensino`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDateLong(dateString: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const category = getBlogCategoryBySlug(post.category);
  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          ...(category
            ? [
                {
                  label: category.nome,
                  href: `/blog/categoria/${category.slug}`,
                },
              ]
            : []),
          { label: post.title },
        ]}
      />

      {/* Article */}
      <Container className="pb-16 pt-6">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            {/* Category badge */}
            {category && (
              <Link href={`/blog/categoria/${category.slug}`}>
                <Badge
                  variant="category"
                  color={category.corHex}
                  size="md"
                  className="mb-4 hover:opacity-80 transition-opacity"
                >
                  {category.nome}
                </Badge>
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-brand-navy)] dark:text-white leading-tight mb-4">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-[var(--color-foreground-muted)] leading-relaxed mb-6">
              {post.description}
            </p>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-foreground-muted)] pb-6 border-b border-[var(--color-border)]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDateLong(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime} min de leitura
              </span>
            </div>
          </header>

          {/* MDX Content */}
          <div className="prose max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--color-foreground-muted)] mr-1">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-foreground-muted)] hover:border-[var(--color-brand-navy)] hover:text-[var(--color-brand-navy)] dark:hover:border-[var(--color-brand-green)] dark:hover:text-[var(--color-brand-green)] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share buttons */}
          <ShareButtons title={post.title} slug={post.slug} />
        </article>
      </Container>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <Section variant="alt">
          <Container>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-8 text-center">
              Artigos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {relatedPosts.map((related) => {
                const relCat = getBlogCategoryBySlug(related.category);
                const relColor = relCat?.corHex || "#6B7280";
                return (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col rounded-xl bg-[var(--color-background)] dark:bg-[#1a1a1a] border border-[var(--color-border)] hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    <div
                      className="h-28 w-full flex items-center justify-center"
                      style={{ backgroundColor: `${relColor}15` }}
                    >
                      <Newspaper className="h-8 w-8" style={{ color: `${relColor}60` }} />
                    </div>
                    <div className="p-4">
                      <Badge variant="category" color={relColor} size="sm" className="mb-2">
                        {relCat?.nome || related.category}
                      </Badge>
                      <h3 className="font-semibold text-sm leading-snug text-[var(--color-foreground)] group-hover:text-[var(--color-brand-navy)] dark:group-hover:text-white transition-colors mb-2 line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="text-xs text-[var(--color-foreground-muted)] flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {related.readingTime} min
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
