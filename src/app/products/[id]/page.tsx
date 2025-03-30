import { ProductDetail } from "@/components/ProductDetail";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Product ${id}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return <ProductDetail productId={id} />;
}
