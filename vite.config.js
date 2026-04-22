//Name: Pratig Thapa Magar
//Course Code: INFT 2202
//Date: 2025-04-20
//Description: This is the Vite configuration file for the React application. 
// It imports the necessary plugins and defines the configuration for the Vite build tool.
// The base path is set to 'WebDev-CSS-Assignment-4' to ensure that the application works correctly when deployed to a subdirectory.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], base:'WebDev-CSS-Assignment-4' })
