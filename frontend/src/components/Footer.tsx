import React from "react";
import { Logo } from "./ui/logo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <Logo size={100} />

        <div className="text-center">
          <p className="font-semibold text-lg">YMARY Comércio LTDA</p>
        </div>

        <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-300">
          <a href="#social-media" className="hover:text-white">
            Redes Sociais
          </a>
          <a href="#terms" className="hover:text-white">
            Termos de Uso
          </a>
          <a href="#privacy-policy" className="hover:text-white">
            Política de Privacidade
          </a>
          <a href="#jobs" className="hover:text-white">
            Vagas de Emprego
          </a>
        </div>

        <div className="text-center text-sm text-gray-300">
          <p className="font-semibold">Meios de pagamento aceitos:</p>
          <p>
            Mastercard, Visa, Elo, Alelo, Sodexo, VR, Ticket
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
