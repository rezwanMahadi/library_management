'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from 'react';
let tagFetchStatus = true;
export default function AddProduct() {
    const [rfidValue, setRfidValue] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == 'bookTitle') {
            setBookTitle(e.target.value)
        }
        else if (e.target.name == 'bookAuthor') {
            setBookAuthor(e.target.value)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rfidValue != '' && bookTitle != '' && bookAuthor != '') {
            const data = {
                bookId: rfidValue,
                title: bookTitle,
                author: bookAuthor
            };
            console.log(data);
            let res = await fetch("/api/addNewBook", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let response = await res.json();
            if (response.success == true) {
                console.log("success");
            } else {
                console.log("error");
            }
            console.log(response);
            setRfidValue('');
            setBookTitle('');
            setBookAuthor('');
        }
        else {
            console.log("All fields are required!");
        }
    }
    useEffect(() => {
        if (rfidValue == '') {
            const fetchreceivedTag = async () => {

                let res = await fetch("/api/fetchtag", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const receivedTag = await res.json();
                console.log("response from fetchdata:", receivedTag);

                if (receivedTag.success == true) {
                    tagFetchStatus = false;
                    if (intervalIdRef.current) {
                        clearInterval(intervalIdRef.current);
                        intervalIdRef.current = null;
                    }
                    setRfidValue(receivedTag.tag);
                } else {
                    // notifyError("Error: Tag Not Found");
                    console.log(receivedTag);
                }
            }
            intervalIdRef.current = setInterval(fetchreceivedTag, 10000);
        }
    }, [rfidValue]);


    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            {/* <Toaster/> */}
            <Card className="w-[350px] bg-indigo-50">
                <CardHeader>
                    <CardTitle>Add Book Information</CardTitle>
                    <CardDescription>Book information</CardDescription>
                    <div className="flex items-center bg-violet-500 text-white text-sm font-bold px-4 py-3" role="alert">
                        {/* <ShieldCheckIcon className="w-6 mr-3" /> */}
                        <p>RFID Tag will be updated automatically.</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">RFID Tag</Label>
                                <Input type="text" value={rfidValue} name="rfidValue" readOnly placeholder="Tag will appear here automatic" className={`${rfidValue === '' ? 'bg-pink-200' : 'bg-green-200'}`} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="bookTitle">Book Title</Label>
                                <Input name="bookTitle" id="bookTitle" onChange={handleChange} value={bookTitle} type="text" placeholder="Enter book title" className="bg-white" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="bookAuthor">Book Author</Label>
                                <Input name="bookAuthor" id="bookAuthor" onChange={handleChange} value={bookAuthor} type="text" placeholder="Enter book author" className="bg-white" />
                            </div>
                            <div className="flex justify-center">
                                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            {/* <ToastContainer /> */}
        </div>
    );
}
