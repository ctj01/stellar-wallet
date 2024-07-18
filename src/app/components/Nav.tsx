"use client";
import Image from "next/image";
import { Login } from "./Login";
import { useAppSelector } from "../state/store/Store";
import { LogOut } from "./Logout";

export const Nav = () => {
    const auth = useAppSelector(state => state.auth);
    return (
        <nav className="bg-neutral-100 border-black-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between mx-auto p-5">
                <Image
                    src="https://developers.stellar.org/img/stellar-logo.svg"
                    alt="Stellar"
                    width={120}
                    height={120}
                />
                {auth.auth.isAuthenticated ? (
                    <LogOut />
                ) : (
                    <Login />
                )}
            </div>
        </nav>
    );
}