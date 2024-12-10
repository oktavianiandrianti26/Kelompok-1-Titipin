import React from "react";
import { FiCamera, FiDollarSign, FiPackage } from "react-icons/fi";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

// Format Ke rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

// Total dengan rupiah jika ispendapatan = true
const Chart = ({ data, width = 350, height = 300, isPendapatan = true }) => {
  const grandTotal = data.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="flex flex-col border m-4 rounded-lg w-full">
      <h2 className="text-xl font-normal text-gray-700  m-4">
        {isPendapatan ? "Total Pendapatan" : "Total Barang"}
        <br />
      </h2>

      <div className=" border-t p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-emerald-500  text-right p-3 rounded-full bg-emerald-100">
            {isPendapatan ? (
              <FiDollarSign size={24} />
            ) : (
              <FiPackage size={24} />
            )}
          </div>
          <h2 className="text-emerald-500 text-2xl font-semibold text-right ">
            {isPendapatan ? formatRupiah(grandTotal) : grandTotal + " Barang"}
          </h2>
        </div>
        <BarChart width={width} height={height} data={data}>
          <XAxis dataKey="name" />
          <Tooltip
            formatter={(value) => (isPendapatan ? formatRupiah(value) : value)}
          />
          <Bar dataKey="total" fill="#10b981" />
        </BarChart>
      </div>
    </div>
  );
};

export default Chart;
