"use client"
import { useEffect, useState } from "react";

interface NumberCountAnimationProps {
  limit: number;
  className?: string;
}

export const NumberCountAnimation=({ limit, className }: NumberCountAnimationProps) => {

  const [number, setNumber]=useState(0);

  useEffect(() => {
    const interval=setInterval(() => {
      if (number<limit) {
        setNumber((prev) => prev>1000? prev+15:prev+1);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [number, limit]);


  const formatNumber=(num: number) => {
    if (num>=1000) {
      return `${(num/1000).toFixed(num===limit? 0:1)}k`;
    }
    return num;
  }

  return (
    <div className={className}>{formatNumber(number)}</div>
  );
};