import ProductTable from "@/app/_components/product/product-table";


const Product = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold mb-2 mt-4 mx-2 text-primary-foreground font-poppin dark:text-white">
        Product
      </h1>

      <div>
        <ProductTable />
      </div>
    </div>
  );
};

export default Product;
