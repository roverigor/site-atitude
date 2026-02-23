import { Metadata } from "next";
import { getPostsByTag, getAllTags } from "@/lib/blog";
import { blogCategories } from "@/data/blog-categories";
import { BlogPage } from "@/components/blog/BlogPage";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    slug: tag,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Tag: ${slug} | Blog`,
    description: `Artigos sobre ${slug} no blog da Atitude Ensino.`,
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getPostsByTag(slug);
  const allTags = getAllTags();

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          { label: `Tag: ${slug}` },
        ]}
      />

      <Container className="pb-16 pt-6">
        <BlogPage
          posts={posts}
          categories={blogCategories}
          allTags={allTags}
          initialTag={slug}
          pageTitle={`Tag: ${slug}`}
          pageDescription={`Todos os artigos com a tag "${slug}".`}
        />
      </Container>
    </>
  );
}
