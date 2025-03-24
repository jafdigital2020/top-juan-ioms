import React from 'react';
import { Card } from '../ui/card';


interface Bestseller {
  name: string;
  sku: string;
  image_path: string;
  price: string;
  sold_quantity: number;
  revenue: string;
}

interface BestsellerProps {
  bestseller: Bestseller;
}

const BestProductsKpi: React.FC<BestsellerProps> = ({ bestseller }) => {
  return (
    <Card className="flex items-center p-4 mb-4 rounded-lg">
      <img src={`${bestseller.image_path}`} alt={bestseller.name} className="w-16 h-16 mr-4" />
      <div className="flex-grow">
        <div className="text-sm font-semibold ">{bestseller.name}</div>
        <div className="text-sm text-gray-500">#{bestseller.sku}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-500">{bestseller.sold_quantity}/sold</div>
        <div className="text-sm font-semibold">{bestseller.revenue} revenue</div>
      </div>
      <div className="ml-4">
        <a href="#" className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </Card>
  );
}

export default BestProductsKpi;
