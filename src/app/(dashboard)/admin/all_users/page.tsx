"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from 'react';


interface User {
    id: number;
    name: string | null;
    email: string;
    phone: string | null;
    role: string | null;
    universityId: string | null;
}

export default function AllUsers() {
    const [Users, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('/api/users', { cache: 'no-store' });
				const contentType = response.headers.get('content-type') || '';
				if (!response.ok || !contentType.includes('application/json')) {
					throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
				}
				const all_users = await response.json();
				setAllUsers(Array.isArray(all_users) ? all_users : []);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};
		// initial fetch
		fetchUsers();
		// poll every 5 seconds
		const intervalId = setInterval(fetchUsers, 5000);
		return () => clearInterval(intervalId);
	}, []);


    return (
        <div>
            <div className="bg-sky-300 w-full rounded-md h-16 flex items-center justify-center">
                <h1 className="text-blue-900 text-[30px]">All Users</h1>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>University ID</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.universityId}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
