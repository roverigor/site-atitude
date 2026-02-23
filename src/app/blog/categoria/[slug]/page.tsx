import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllTags } from "@/lib/blog";
import { blogCategories, getBlogCategoryBySlug } from "@/data/blog-categories";
import { BlogPage } from "@/components/blog/BlogPage";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { BlogCategory } from "@/types/blog";

export async function generateStaticParams() {
  return blogCategories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategoryBySlug(slug as BlogCategory);

  if (!category) {
    return { title: "Categoria nao encontrada" };
  }

  return {
    title: `${category.nome} | Blog`,
    description: category.descricao,
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getBlogCategoryBySlug(slug as BlogCategory);

  if (!category) notFound();

  const posts = getPostsByCategory(slug as BlogCategory);
  const allTags = getAllTags();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: category.nome },
        ]}
      />

      <Container className="pb-16 pt-6">
        <BlogPage
          posts={posts}
          categories={blogCategories}
          allTags={allTags}
          initialCategory={slug as BlogCategory}
          pageTitle={category.nome}
          pageDescription={category.descricao}
        />
      </Container>
    </>
  );
}
