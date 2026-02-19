import { css } from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

export const cardStyles = css`
  ha-card { padding: 16px; font-family: 'Roboto', sans-serif; border-radius: 12px; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }  
  .title { font-weight: bold; font-size: 1.1em; }
  .info-icon { cursor: pointer; transition: 0.3s; }
      
  .main-container { display: flex; gap: 12px; }
  .image-col { flex: 1; cursor: pointer; } /* 1/3 szerokości */
  .data-col { flex: 2; display: flex; flex-direction: column; gap: 6px; } /* 2/3 szerokości */
      
  img { width: 100%; height: 100%; border-radius: 10px; object-fit: cover; }
      
  .param-row { display: flex; align-items: center; gap: 10px; background: var(--secondary-background-color); padding: 6px 10px; border-radius: 8px; }
  .param-text { display: flex; flex-direction: column; flex-grow: 1; }
  .p-name { font-size: 0.75em; color: var(--secondary-text-color); }
  .p-state { font-weight: bold; font-size: 0.9em; }
  .range { font-size: 0.8em; font-weight: bold; white-space: nowrap; }
      
  .fertilize-btn { margin-top: 12px; display: flex; align-items: center; gap: 12px; padding: 10px; background: var(--primary-color); color: white; border-radius: 8px; cursor: pointer; }
  .btn-text { display: flex; flex-direction: column; }
  .btn-primary { font-weight: bold; font-size: 0.9em; }
  .btn-secondary { font-size: 0.7em; opacity: 0.9; }
      
  .details-section { font-size: 0.85em; line-height: 1.4; color: var(--primary-text-color); }
  .details-section ha-markdown { display: block; font-size: 0.9em;}
  
  hr { border: 0; border-top: 1px solid var(--divider-color); margin: 10px 0; }
`;