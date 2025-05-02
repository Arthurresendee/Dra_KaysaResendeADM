import styles from "./UltimasAtualizacoes.module.css";

export function UltimasAtualizacoes() {
  const logs = [
    "Imagem X adicionada à galeria (22/01)",
    "Texto da apresentação atualizado (21/01)",
    "Novo card criado: 'Depoimentos' (20/01)",
  ];

  return (
    <div className={styles.atualizacoes}>
      <h2>Últimas Atualizações</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
