import { cookies } from 'next/headers';
import { LogoutBtn } from '@/component/logout_btn';
import { AvailableBooks } from '@/component/availableBooksBtn';
import { AssignedBooksBtn } from '@/component/assignedBooksBtn';
import { SeatStatusDisplay } from '@/component/seatStatusDisplay';

export default async function AdminPage() {
    const cookieStore = await cookies();
    const email = cookieStore.get("email")?.value;
    const role = cookieStore.get("role")?.value;
    const name = cookieStore.get("name")?.value;
    const universityId = cookieStore.get("universityId")?.value;

    return (
        <main className='flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 p-4'>
            <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center gap-4'>
                <div className='flex items-center gap-6'>
                    <div className='text-gray-900'>
                        <h1>Student Dashboard</h1>
                        <p>Name: {name}</p>
                        <p>University ID: {universityId}</p>
                        <p>Email: {email}</p>
                        <p>Role: {role}</p>
                    </div>
                    <LogoutBtn />
                </div>
                <div className='mt-4 w-full gap-4 flex items-center justify-center'>
                    <AvailableBooks />
                    <AssignedBooksBtn />
                </div>
                <SeatStatusDisplay />
            </div>
        </main>
    );
}