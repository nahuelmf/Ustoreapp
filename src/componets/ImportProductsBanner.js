import React from "react";
import { Info } from "lucide-react"; // Icon from Lucide (optional)

const ImportProductsBanner = () => {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl shadow-md flex items-start gap-3 max-w-3xl mx-auto mt-4">
      <Info className="w-6 h-6 mt-1 text-yellow-700" />
      <div>
        <h2 className="font-semibold text-lg">¡Nuevos productos importados!</h2>
        <p className="text-sm">
          Explora nuestra selección exclusiva de productos importados. Calidad garantizada, stock limitado y envíos rápidos a todo el país.
        </p>
      </div>
    </div>
  );
};

export default ImportProductsBanner;
