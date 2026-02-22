import { css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

export const cardStyles = css`
  ha-card { padding: 16px; font-family: 'Roboto', sans-serif; border-radius: 12px; }
  
  /* ---- NAGŁÓWEK ---- */
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }   
  
  .header-icons { display: flex; gap: 12px; align-items: center; }

  /* ---- NAZWA ROŚLINY ---- */
  .title { font-weight: bold; font-size: 18px; }
  
  /* IKONY AKCJI */
  .info-icon, .scroll-top-icon { 
    cursor: pointer; 
    transition: 0.3s; 
    --mdc-icon-size: 24px; 
  }
  
  .scroll-top-icon { color: var(--secondary-text-color); opacity: 0.7; }
  .scroll-top-icon:hover { opacity: 1; color: var(--primary-color); transform: translateY(-2px); }
      
  .main-container { display: flex; gap: 12px; }
  .image-col { flex: 1; cursor: pointer; } 
  .data-col { flex: 2; display: flex; flex-direction: column; gap: 6px; } 
      
  img { width: 100%; height: 100%; border-radius: 10px; object-fit: cover; }
      
  .param-row { display: flex; align-items: center; gap: 10px; background: var(--secondary-background-color); padding: 6px 10px; border-radius: 8px; }
  .param-text { display: flex; flex-direction: column; flex-grow: 1; }
  
  .p-name { font-size: 16px; color: var(--secondary-text-color); }
  .p-state { font-weight: bold; font-size: 19px; }
  .range { font-size: 19px; font-weight: bold; white-space: nowrap; }
      
  .fertilize-btn { margin-top: 12px; display: flex; align-items: center; gap: 12px; padding: 10px; background: var(--primary-color); color: white; border-radius: 8px; cursor: pointer; }
  .btn-text { display: flex; flex-direction: column; }
  .btn-primary { font-weight: bold; font-size: 18px; }
  .btn-secondary { font-size: 15px; opacity: 0.9; }
  
  .details-section { font-size: 16px; line-height: 1.6; color: var(--primary-text-color); }
  .details-section ha-markdown { display: block; font-size: 16px;}
  
  hr { border: 0; border-top: 1px solid var(--divider-color); margin: 10px 0; }
`;

export const chipStyles = css`
  :host {
    display: inline-block;
  }
  
  .chip {
    display: flex;
    align-items: center;
    border-radius: 16px;
    padding: 4px 10px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.3s ease; /* Płynne pojawianie się tła i ramki */
    border: 1px solid transparent; /* Domyślnie brak ramki */
  }

  ha-icon {
    --mdc-icon-size: 18px;
    /* Usuwamy margines, jeśli nie ma tekstu (spanu) */
  }

  /* Margines tylko gdy po ikonie następuje span z tekstem */
  ha-icon + span {
    margin-left: 4px;
  }

  span {
    font-size: 12px;
    font-weight: bold;
    color: var(--primary-text-color);
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 var(--glow-color); }
    70% { box-shadow: 0 0 0 8px rgba(0, 0, 0, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
  }
`;

export const editorStyles = css`
  .card-config {
    padding: 4px;
  }
  .preview-section {
    margin-top: 20px;
    border-top: 1px solid var(--divider-color);
    padding-top: 10px;
  }
  .preview-label {
    font-size: 10px;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
    text-transform: uppercase;
  }
`;