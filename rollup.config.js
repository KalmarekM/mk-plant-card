import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/mk-plant-card.js', // Twój kod źródłowy
  output: {
    file: 'dist/mk-plant-card.js', // Plik wynikowy dla HACS
    format: 'es',
  },
  external: [
    'https://unpkg.com/lit-element@2.4.0/lit-element.js?module'
  ],
  plugins: [
    nodeResolve(),
    terser({
      format: {
        comments: false, // Usuwa komentarze
      },
      mangle: {
        toplevel: true, // Skraca nazwy zmiennych
        reserved: [
          'setConfig',
          'render', 
          'getProperties',
          'getStubConfig', 
          'getConfigElement', 
          '_valueChanged', 
          '_schema'        ] // Zachowuje nazwy tych metod
      }
    }),
  ],
};