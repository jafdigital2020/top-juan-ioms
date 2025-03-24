import ListCard from '@/components/cards/BestProductCard';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BestSeller {
    name: string;
    sku: string;
    image_path: string;
    price: string;
    sold_quantity: number;
    revenue: string;
}

const BestSellerList: React.FC = () => {
    const [bestsellerList, setBestsellerList] = useState<BestSeller[]>([]);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/api/report/list/product`);
                setBestsellerList(response.data.success.data);
            } catch (error) {
                console.error('Error fetching best sellers:', error);
            }
        };

        fetchBestSellers();
    }, []);

    return (
        <div className="pt-2 h-full">
            {bestsellerList.map(bestseller => (
                <ListCard key={bestseller.sku} bestseller={bestseller} />
            ))}
        </div>
    );
};

export default BestSellerList;