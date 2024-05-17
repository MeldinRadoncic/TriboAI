import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function absoluteUrl(path) {

  if(process.env.NODE_ENV === 'production') {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
  } else {
    return `http://localhost:3000${path}`
  }

}