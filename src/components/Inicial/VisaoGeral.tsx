import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./VisaoGeral.module.css";
import { Card } from "../../types/types";


export function VisaoGeral() {
  const [contagens, setContagens] = useState({
    totalImagens: 0,
    totalCards: 0,
  });

  useEffect(() => {
    const buscarContagens = async () => {
      try {
         
        
        
        const respostaCards = await axios.get<{ data: Card[] }>("http://localhost:5200/api/card");

        setContagens({
         //  totalImagens: respostaImagens.data.data.length,
          totalImagens: 5,
          totalCards: respostaCards.data.data.length,
        });
      } catch (error) {
        console.error("Erro ao buscar contagens:", error);
      }
    };

    buscarContagens();
  }, []);

  const dados = [
    { titulo: "Total de Imagens", valor: contagens.totalImagens },
    { titulo: "Cards na Landing Page", valor: contagens.totalCards },
  ];

  return (
    <div className={styles.visaoGeral}>
      {dados.map((item, index) => (
        <div key={index} className={styles.card}>
          <h2>{item.valor}</h2>
          <p>{item.titulo}</p>
        </div>
      ))}
    </div>
  );
}