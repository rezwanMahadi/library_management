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
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from 'react';
// import { ShieldCheckIcon } from '@heroicons/react/24/outline';
// import { useToast } from "@/components/hooks/use-toast"
// import { Toaster } from "@/components/ui/toaster";
let tagFetchStatus = true;
export default function AddProduct() {
    const [rfidValue, setRfidValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');
    const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // function notifyError(message) {
    //     toast.error(message, {
    //         position: "top-center",
    //         autoClose: 2000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: false,
    //         theme: "colored",
    //     })
    // };
    // function notifySuccess(message) {
    //     toast.success(message, {
    //         position: "top-center",
    //         autoClose: 2000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: false,
    //         theme: "colored",
    //     })
    // };

    // const myTimeout = setTimeout(myGreeting, 5000);
    // clearTimeout(myTimeout);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == 'nameValue') {
            setNameValue(e.target.value)
        }
        else if (e.target.name == 'categoryValue') {
            setCategoryValue(e.target.value)
        }
        else if (e.target.name == 'quantityValue') {
            setQuantityValue(e.target.value)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rfidValue != '' && nameValue != '' && quantityValue != '' && categoryValue != '') {
            // const id = toast.loading("Please wait...", {
            //     position: "top-center",
            // })
            const data = {
                tag: rfidValue,
                productName: nameValue,
                quantity: quantityValue,
                category: categoryValue
            };
            console.log(data);
            let res = await fetch("/api/addProductData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let response = await res.json();
            if (response.success == true) {
                console.log("success");
                // notifySuccess("Product Added Successfully.");
                // toast.update(id, {
                //     position: "top-center",
                //     hideProgressBar: true,
                //     autoClose: 2000,
                //     render: "Product Saved Successfully.",
                //     type: "success",
                //     isLoading: false,
                //     theme: "colored",
                // }
                // );
            } else {
                console.log("error");
            }
            console.log(response);
            setRfidValue('');
            setNameValue('');
            setCategoryValue('');
            setQuantityValue('');
        }
        else {
            // toast.warn("All fields are required!", {
            //     position: "top-center",
            //     autoClose: 1300,
            //     hideProgressBar: true,
            //     closeOnClick: false,
            //     pauseOnHover: false,
            //     draggable: false,
            //     theme: "colored",
            // })
            console.log("All fields are required!");
        }
    }
    useEffect(() => {
        if (rfidValue == '') {
            // const id = toast.loading("Waiting for RFID Tag", {
            //     toastId: "1234567890",
            //     position: "top-center",
            // })
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
                    // toast.update(id, {
                    //     position: "top-center",
                    //     autoClose: 2000,
                    //     render: "RFID Tag Received.",
                    //     type: "success",
                    //     isLoading: false,
                    //     pauseOnHover: false,
                    //     hideProgressBar: true,
                    //     theme: "colored",
                    // }
                    // );
                    setRfidValue(receivedTag.tag);
                } else {
                    // notifyError("Error: Tag Not Found");
                    console.log(receivedTag);
                }
            }
            intervalIdRef.current = setInterval(fetchreceivedTag, 10000);
        }
    }, [rfidValue]);


    // const intervalId = setInterval(fetchreceivedTag, 5000);

    // Set up polling to fetch data every 10 seconds


    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            {/* <Toaster/> */}
            <Card className="w-[350px] bg-indigo-50">
                <CardHeader>
                    <CardTitle>Add User Information</CardTitle>
                    <CardDescription>User information</CardDescription>
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
                                <Label htmlFor="nameValue">User Name</Label>
                                <Input name="nameValue" id="nameValue" onChange={handleChange} value={nameValue} type="text" placeholder="Type product name" className="bg-white" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="categoryValue">Category</Label>
                                <Input name="categoryValue" id="categoryValue" onChange={handleChange} value={categoryValue} type="text" placeholder="Type product category" className="bg-white" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="quantityValue">Quantity</Label>
                                <Input name="quantityValue" id="quantityValue" onChange={handleChange} value={quantityValue} type="number" placeholder="Type quantity" className="bg-white" />
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
