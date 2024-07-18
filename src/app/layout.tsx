
"use client";

import { Inter } from "next/font/google";
import "./globals.css";

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./state/store/Store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import React from "react";
import IconButton from "@mui/material/IconButton";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: string) => () => {
    notistackRef.current?.closeSnackbar(key);
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider
        ref={notistackRef}
        autoHideDuration={3000}
        action={(key : any) => (
          <IconButton onClick={onClickDismiss(key)}>
            X
          </IconButton>
        )}  
        maxSnack={1}>
        <html lang="en">
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            />

          </head>
          <body className={inter.className}>{children}</body>
        </html>
      </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}
