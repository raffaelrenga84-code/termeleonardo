/* Una fotografia del sito, presa da src/foto.js (generato da
   strumenti/foto.js): srcset con le tre misure, width e height per
   riservare lo spazio, caricamento pigro per tutto tranne la prima.

   `sizes` dice al browser quanto sara' larga la foto sullo schermo, ed e'
   quello che gli fa scegliere la misura giusta: senza, prende la piu'
   grande e il lavoro delle tre misure e' buttato. Va scritto dove la foto
   viene usata, perche' solo li' si sa in che colonna sta.

   `priorita` e' per la sola fotografia in cima alla pagina: si carica
   subito e con precedenza, perche' e' quella su cui si misura il tempo
   di apertura. Tutte le altre aspettano di avvicinarsi allo schermo. */
export default function Foto({ foto, alt = "", sizes = "100vw", priorita = false, className = "", ...resto }) {
  return (
    <img
      src={foto.src}
      srcSet={foto.srcset}
      sizes={sizes}
      width={foto.width}
      height={foto.height}
      alt={alt}
      loading={priorita ? "eager" : "lazy"}
      decoding={priorita ? "sync" : "async"}
      fetchPriority={priorita ? "high" : undefined}
      className={className}
      {...resto}
    />
  );
}
