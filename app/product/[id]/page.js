export default async function Home({ params }) {
  const APIBASE = process.env.NEXT_PUBLIC_BASE_PATH;

  const data = await fetch(`${APIBASE}/api/product/${params.id}`, {
    cache: "no-store",
  });
  const product = await data.json();
  console.log({ product, category: product.category });
  // const id = params.id;
  return (
    <div>
      <h1>Product</h1>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.category.name}</p>
    </div>
  );
}
