import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import Barcode from 'react-barcode';
import QRCode from "react-qr-code";

interface ViewProps {
    order: {
        order_id: number;
    };
}

interface WaybillDetails {
    order_id: number;
    order_date: string;
    franchise_name: string;
    franchise_address: string;
    franchise_city: string;
    franchise_province: string;
    franchise_zip: string;
    franchisee_name: string;
    seller: string;
    user_name: string;
    tracking_number: string;
    orderItems: {
        product_name: string;
        quantity: number;
    }[];
}

export default function ViewWaybillOrderDialog({ order }: ViewProps) {
    const [waybillDetails, setWaybillDetails] = useState<WaybillDetails | null>(null);
    const componentRef = useRef(null); // Ref for printing

    // Fetch waybill details
    useEffect(() => {
        const fetchWaybillDetails = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_PUBLIC_API_URL}/api/order/waybill/${order.order_id}`
                );
                if (response.data.success.code === 200) {
                    setWaybillDetails(response.data.success.data);
                }
            } catch (error) {
                console.error("Error fetching waybill details:", error);
            }
        };
        fetchWaybillDetails();
    }, [order.order_id]);


    if (!waybillDetails) {
        return <p>Loading waybill details...</p>;
    }

    return (
        <div>
            {/* Waybill Card */}
            <div ref={componentRef}>
                <h1>Order ID: {waybillDetails.order_id}</h1>
                <Card className="p-4 shadow-md rounded-lg border">
                    <div className="flex flex-col gap-4">
                        {/* Header Information */}
                        <div className="text-center flex flex-col items-center">
                            <h2 className="text-xl font-bold text-primary">Top Juan Shipping Xpress</h2>
                            <p className="text-sm text-gray-600">Tracking Number:</p>
                            <Barcode fontSize={14} height={65} value={waybillDetails.tracking_number} />
                        </div>

                        {/* Franchise Details */}
                        <div className="border-t border-gray-300 pt-3">
                            <h3 className="font-medium text-lg text-gray-700">Franchise Details (Buyer)</h3>
                            <p className="text-gray-600">{waybillDetails.franchise_name}</p>
                            <p className="text-gray-600">{waybillDetails.franchise_address}</p>
                            <p className="text-gray-600">
                                {waybillDetails.franchise_city}, {waybillDetails.franchise_province} {waybillDetails.franchise_zip}
                            </p>
                            <p className="text-gray-600">
                                Franchisee: <span className="font-semibold">{waybillDetails.franchisee_name}</span>
                            </p>
                        </div>

                        {/* Seller Details */}
                        <div className="border-t border-gray-300 pt-3">
                            <h3 className="font-medium text-lg text-gray-700">Seller</h3>
                            <p className="text-gray-600">{waybillDetails.seller}</p>
                        </div>

                        {/* Order Items */}
                        <div className="border-t border-gray-300 pt-3">
                            <h3 className="font-medium text-lg text-gray-700">Order Items</h3>
                            {waybillDetails.orderItems.map((item, index) => (
                                <p key={index} className="text-gray-600">
                                    <span className="font-semibold">{item.product_name}</span> - Quantity: {item.quantity}
                                </p>
                            ))}
                        </div>

                        {/* Order Date */}
                        <div className="border-t border-gray-300 pt-3">
                            <h3 className="font-medium text-lg text-gray-700">Order Date</h3>
                            <p className="text-gray-600">{new Date(waybillDetails.order_date).toLocaleDateString()}</p>
                        </div>

                        {/* QR Code */}
                        <div className="border-t border-gray-300 pt-3 text-center">
                            <QRCode size={100} value={waybillDetails.order_id.toString()} />
                        </div>
                    </div>
                </Card>
            </div>

       
        </div>
    );
}
