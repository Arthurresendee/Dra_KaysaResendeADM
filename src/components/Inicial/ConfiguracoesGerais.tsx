import styles from "./ConfiguracoesGerais.module.css";

export function ConfiguracoesGerais() {
  return (
    <div className={styles.configuracoes}>
      <h2>Configurações Gerais</h2>
      <p>Altere configurações globais do site, como temas e favicon.</p>
      <button className={styles.botao}>Ir para Configurações</button>
    </div>
  );
}
