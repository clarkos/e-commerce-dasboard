"use client"

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils"
import { Button } from "./ui/button";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Dashboard',
      active: pathname === `/${params.storeId}`
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboard',
      active: pathname === `/${params.storeId}/billboards`
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.storeId}/categories`
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.storeId}/colors`
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Products',
      active: pathname === `/${params.storeId}/products`
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.storeId}/orders`
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/settings`
    },
  ];

  return (
    <>
      <Button onClick={toggleOpen} className="flex items-center md:hidden" variant="outline">
        {isOpen ? <X size={15} /> : <Menu size={15} />}
      </Button>
      <div
        className={
          " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
      >
        <section
          className={
            " w-screen max-w-lg right-0 absolute bg-black bg-opacity-75 h-full delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <div className="flex items-center justify-end px-5 my-3">
            <Button onClick={toggleOpen}>{<X size={20} />}</Button>
          </div>
          <ul className="flex flex-col mx-8">
            {
              routes.map((route, index) => (
                <li key={`${index}+${route.href}`} className="text-3xl font-bold text-gray-800 py-4 border-t pl-4 border-gray-500 hover:bg-gray-700" onClick={toggleOpen}>
                  <Link
                    
                    href={route.href}
                    className={cn(
                      "transition-colors hover:text-primary",
                      route.active ? " text-black dark:text-white " : "text-muted-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                </li>
              ))
            }
          </ul>
        </section>
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={toggleOpen}
        ></section>
      </div>
    </>
  );
}