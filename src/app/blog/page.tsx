import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { blogCategories } from "@/data/blog-categories";
import { BlogPage } from "@/components/blog/BlogPage";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dicas, novidades e conteudos sobre informatica, ingles, carreira e muito mais. Acompanhe o blog da Atitude Ensino.",
};

export default function BlogListingPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return (
    <>
      <Breadcrumb items={[{ label: "Blog" }]} />

      <Container className="pb-16 pt-6">
        <BlogPage
          posts={posts}
          categories={blogCategories}
          allTags={allTags}
        />
      </Container>
    </>
  );
}
