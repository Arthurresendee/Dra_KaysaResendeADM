import styles from "./InicialAdm.module.css";
import { BoasVindas } from "../components/Inicial/BoasVindas";
import { ConfiguracoesGerais } from "../components/Inicial/ConfiguracoesGerais";
import { UltimasAtualizacoes } from "../components/Inicial/UltimasAtualizacoes";
import { VisaoGeral } from "../components/Inicial/VisaoGeral";

export function InicialAdm() {
  return (
    <div className={styles.container}>
      <BoasVindas />
      
      {/* Seção de Visão Geral */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Visão Geral do Sistema</h2>
        <VisaoGeral />
      </div>

      {/* Seção de Atividades Recentes */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Atividades Recentes</h2>
        <div className={styles.row}>
          <UltimasAtualizacoes />
          <ConfiguracoesGerais />
        </div>
      </div>
    </div>
  );
}
