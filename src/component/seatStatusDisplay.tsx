'use client';

import { useState, useEffect } from 'react';

interface SeatStatus {
    id: number;
    availabelSeat: number;
}

export function SeatStatusDisplay() {
    const [availableSeats, setAvailableSeats] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchSeatStatus = async () => {
        try {
            const response = await fetch('/api/seatStatus');
            const data = await response.json();
            
            if (data.success && data.seatCount && data.seatCount.length > 0) {
                setAvailableSeats(data.seatCount[0].availabelSeat);
            }
        } catch (error) {
            console.error('Error fetching seat status:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch immediately
        fetchSeatStatus();
        
        // Set up interval to fetch every 5 seconds
        const interval = setInterval(fetchSeatStatus, 5000);
        
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className='w-full bg-blue-50 p-4 rounded-lg border border-blue-200'>
                <h3 className='text-lg font-semibold text-blue-800 mb-2'>Library Seats</h3>
                <p className='text-2xl font-bold text-blue-600'>
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <div className='w-full bg-blue-50 p-4 rounded-lg border border-blue-200'>
            <h3 className='text-lg font-semibold text-blue-800 mb-2'>Library Seats</h3>
            <p className='text-2xl font-bold text-blue-600'>
                Available Seats: {availableSeats}
            </p>
            <p className='text-xs text-blue-500 mt-1'>
                Updates every 5 seconds
            </p>
        </div>
    );
}
