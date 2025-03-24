import React from 'react';

interface Promo {
    title: string;
    dateRange: string;
    image: string; 
}

interface PromoProps {
    promo: Promo;
}

const PromoCards: React.FC<PromoProps> = ({ promo }) => {
    return (
        <div className="bg-white rounded-lg p-2 mb-2 flex items-center">
            <img src={promo.image} alt="Promo Icon" className="w-12 h-12 mr-4" /> {/* Updated to use promo.image */}
            <div>
                <h2 className="text-lg font-bold mb-2 text-base">{promo.title}</h2>
                <p className="text-gray-600">{promo.dateRange}</p>
            </div>
        </div>
    );
};

export default PromoCards;
