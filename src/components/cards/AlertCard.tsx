import React from 'react';

interface Promo {
  item: string;
  alert: string;
  action: string;
}

interface PromoProps {
    alert: Promo;
}

const AlertCards: React.FC<PromoProps> = ({ alert }) => {
    return (
        <div className="bg-white rounded-lg p-2 mb-2 flex items-center">
            <img src="" alt="Promo Icon" className="w-12 h-12 mr-4" /> 
            <div>
                <h2 className="text-lg font-bold mb-2 text-base">{alert.item}</h2>
                <p className="text-gray-600">{alert.alert}</p>
            </div>
            <button>Restock</button>
        </div>
    );
};

export default AlertCards;
