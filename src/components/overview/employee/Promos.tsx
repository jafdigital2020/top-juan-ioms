import React from 'react';
import PromoCards from '../../cards/PromoCard';
import promos from '../../../data/promos'; // Adjust the import path as necessary

const Promos: React.FC = () => {
    return (
        <>
        <div className='px-4'>
        <h2 className="text-xl font-bold mt-8 mb-4">Juan Cafe Promos</h2>
            <hr className="border-base my-4 " />
            <div className="grid grid-cols-1">
                {promos.map((promo, index) => (
                    <PromoCards key={index} promo={promo} />
                ))}
            </div>

        </div>
          
        </>
    );
};

export default Promos;
