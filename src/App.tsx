import { useState } from "react";

// ══════════════════════════════════════════════════════════════════
// DATOS OFICIALES — NOM-138-SEMARNAT/SSA1-2012
// ══════════════════════════════════════════════════════════════════

const MODULES = [
  { id: "definiciones",   label: "Definiciones Clave",            icon: "📖", color: "#6366F1" },
  { id: "tabla1",         label: "Productos Contaminantes",       icon: "🛢️", color: "#F59E0B" },
  { id: "lmp_fracciones", label: "LMP — Fracciones",             icon: "⚗️", color: "#10B981" },
  { id: "lmp_especificos",label: "LMP — Compuestos Específicos",  icon: "🧬", color: "#EF4444" },
  { id: "muestreo",       label: "Plan de Muestreo",              icon: "🗺️", color: "#14B8A6" },
  { id: "recipientes",    label: "Recipientes y Conservación",    icon: "🧪", color: "#EC4899" },
];

const FLASHCARDS = {
  definiciones: [
    {
      p: "¿Qué son las 'Características del sitio de muestreo' según la NOM-138?",
      r: "Son los elementos físicos, biológicos, geográficos y socioeconómicos de un sitio presumiblemente contaminado.\n\nSon factores a considerar en:\n• La planeación y ejecución del muestreo\n• La determinación del número y localización de los puntos de muestreo\n• La determinación de la extensión de la contaminación",
      n: "esencial",
    },
    {
      p: "¿Cómo define la NOM-138 el término 'Derrame'?",
      r: "Descarga, liberación, rebose o vaciamiento de hidrocarburos en el suelo.\n\nEsta definición aplica para cualquier mecanismo por el cual los hidrocarburos llegan al suelo, ya sea accidental o por negligencia.",
      n: "esencial",
    },
    {
      p: "¿Cómo clasifica la NOM-138 las fracciones de hidrocarburos según el número de carbonos?",
      r: "• Fracción Ligera: C5 a C10 (cinco a diez átomos de carbono)\n• Fracción Media: C10 a C28 (diez a veintiocho átomos)\n• Fracción Pesada: C28 a C40 (veintiocho a cuarenta átomos)\n\nCada fracción tiene diferente método analítico y LMP según uso de suelo.",
      n: "esencial",
    },
    {
      p: "¿Qué es una 'Muestra Duplicada' según la NOM-138 y cuándo se toma?",
      r: "Es la muestra tomada del MISMO punto y profundidad, bajo las mismas condiciones, INMEDIATAMENTE después de la muestra original, pero de manera independiente y con la misma técnica.\n\nRegla: una muestra duplicada por cada 10 muestras tomadas.\nPara superficies menores a 0.3 ha: mínimo una muestra duplicada de campo.",
      n: "esencial",
    },
    {
      p: "¿Qué es el 'Muestreo Dirigido' según la NOM-138?",
      r: "El que se lleva a cabo sobre puntos específicamente determinados, cuando:\n• Se cuenta con información previa del sitio, O\n• Es evidente la extensión de la afectación\n\n⚠️ En muestreo estadístico NO se deben tomar muestras en los mismos puntos usados en el muestreo dirigido.",
      n: "esencial",
    },
    {
      p: "¿Qué es el 'Muestreo Estadístico' según la NOM-138?",
      r: "Es el realizado conforme a métodos estadísticos, que estime la incertidumbre sobre la extensión y profundidad de la afectación, con un nivel de confianza justificado.\n\nPuede combinarse con el muestreo dirigido, pero los puntos no deben coincidir entre ambos métodos.",
      n: "intermedio",
    },
    {
      p: "¿Qué es el 'Nivel de Fondo' en la NOM-138?",
      r: "Concentración en el suelo de los hidrocarburos regulados que NO son atribuibles a la fuente de contaminación analizada.\n\nSe encuentran:\n• De manera natural en el suelo, O\n• Generados por alguna fuente antropogénica AJENA al sitio, fuera del área contaminada\n\nUso: si el nivel de fondo supera los LMP, la remediación se efectúa hasta alcanzar el nivel de fondo.",
      n: "intermedio",
    },
    {
      p: "¿Qué es un 'Suelo Contaminado con Hidrocarburos' según la NOM-138?",
      r: "Aquel en el cual se encuentran presentes los hidrocarburos incluidos en la TABLA 1, en una concentración MAYOR a los límites máximos permisibles establecidos en las TABLAS 2 y 3.\n\nLa clasificación depende del uso de suelo predominante del sitio.",
      n: "esencial",
    },
    {
      p: "¿Qué significan las siglas BTEX, HAP, LMP y PTFE en la NOM-138?",
      r: "• BTEX: Benceno, Tolueno, Etilbenceno, Xilenos (suma de isómeros orto-, meta- y para-)\n• HAP: Hidrocarburos Aromáticos Policíclicos (o polinucleares)\n• LMP: Límites Máximos Permisibles\n• PTFE: Politetrafluoretileno (teflón) — material requerido para contratapas y sellos de recipientes",
      n: "esencial",
    },
  ],
  tabla1: [
    {
      p: "¿Para el Petróleo Crudo, qué fracciones de hidrocarburos deben analizarse?",
      r: "Para PETRÓLEO CRUDO se analizan TODAS las fracciones:\n✓ Fracción Pesada (C28–C40)\n✓ Fracción Media (C10–C28)\n✓ HAP\n✓ Fracción Ligera (C5–C10)\n✓ BTEX\n\nIgual aplica para 'Mezcla de productos desconocidos derivados del petróleo'.",
      n: "esencial",
    },
    {
      p: "¿Qué fracciones se analizan para Diesel, Turbosina y Queroseno?",
      r: "• DIESEL: Fracción Media (C10–C28) + Fracción Pesada (C28–C40)\n• TURBOSINA: Fracción Media + Fracción Pesada\n• QUEROSENO: Fracción Media + Fracción Pesada\n\nEstos productos NO requieren análisis de BTEX, Fracción Ligera ni HAP.",
      n: "intermedio",
    },
    {
      p: "¿Para Gasolinas y Gas nafta, qué fracciones se analizan?",
      r: "• GASOLINAS: Fracción Ligera (C5–C10) + BTEX\n• GAS NAFTA: Fracción Ligera + BTEX\n• GASAVIÓN: Fracción Ligera + BTEX\n• GASOLVENTE: Fracción Ligera + BTEX\n\nSon productos ligeros; solo se analizan las fracciones volátiles y aromáticos específicos.",
      n: "esencial",
    },
    {
      p: "¿Qué se analiza para Combustóleo, Aceites derivados y Parafinas?",
      r: "• COMBUSTÓLEO: Fracción Pesada + Fracción Media\n• ACEITES DERIVADOS DEL PETRÓLEO: Fracción Pesada + Fracción Media\n• PARAFINAS: Fracción Pesada + Fracción Media\n• PETROLATOS: Fracción Pesada + Fracción Media\n• GASÓLEO: Fracción Pesada + Fracción Media",
      n: "intermedio",
    },
    {
      p: "¿Qué producto, además del petróleo crudo y mezclas desconocidas, requiere análisis de HAP?",
      r: "La CREOSOTA requiere:\n✓ Fracción Pesada (C28–C40)\n✓ HAP\n\nEs el único producto adicional que incluye HAP en la TABLA 1.\n\nEl resto de los productos derivados del petróleo (diesel, gasolinas, combustóleo, etc.) NO requieren HAP según la norma.",
      n: "avanzado",
    },
  ],
  lmp_fracciones: [
    {
      p: "¿Cuáles son los LMP para Fracción Ligera (C5–C10) según uso de suelo?",
      r: "FRACCIÓN LIGERA — Método: NMX-AA-105-SCFI-2008\n(GC con detectores FID o EM)\n\n• Agrícola, forestal, pecuario y de conservación: 200 mg/kg base seca\n• Residencial y recreativo: 200 mg/kg base seca\n• Industrial y comercial: 500 mg/kg base seca\n\nAgrícola y residencial comparten el mismo límite (más estrictos).",
      n: "esencial",
    },
    {
      p: "¿Cuáles son los LMP para Fracción Media (C10–C28) según uso de suelo?",
      r: "FRACCIÓN MEDIA — Método: NMX-AA-145-SCFI-2008\n(GC con detector FID)\n\n• Agrícola, forestal, pecuario y de conservación: 1,200 mg/kg base seca\n• Residencial y recreativo: 1,200 mg/kg base seca\n• Industrial y comercial: 5,000 mg/kg base seca\n\nEl LMP industrial es más de 4 veces mayor que el agrícola/residencial.",
      n: "esencial",
    },
    {
      p: "¿Cuáles son los LMP para Fracción Pesada (C28–C40) según uso de suelo?",
      r: "FRACCIÓN PESADA — Método: NMX-AA-134-SCFI-2006\n(Extracción y gravimetría)\n\n• Agrícola, forestal, pecuario y de conservación: 3,000 mg/kg base seca\n• Residencial y recreativo: 3,000 mg/kg base seca\n• Industrial y comercial: 6,000 mg/kg base seca\n\nEs la fracción con LMP más altos por menor movilidad y toxicidad.",
      n: "esencial",
    },
    {
      p: "¿Qué método analítico mexicano (NMX) corresponde a cada fracción?",
      r: "• Fracción Ligera (C5–C10):\n  NMX-AA-105-SCFI-2008 — GC/FID o GC/EM\n\n• Fracción Media (C10–C28):\n  NMX-AA-145-SCFI-2008 — GC/FID\n\n• Fracción Pesada (C28–C40):\n  NMX-AA-134-SCFI-2006 — Extracción y gravimetría\n\nSolo se reconocen determinaciones de laboratorios acreditados con estos métodos.",
      n: "esencial",
    },
    {
      p: "¿Qué establece la norma para suelos con uso de suelo mixto?",
      r: "NOTA 1 de la TABLA 2:\n\n'Para usos de suelo mixto, deberá aplicarse el límite máximo permisible más estricto, para los usos de suelo involucrados.'\n\nEjemplo: sitio mixto residencial-industrial → aplica el LMP residencial (más restrictivo) para todas las fracciones.",
      n: "intermedio",
    },
  ],
  lmp_especificos: [
    {
      p: "¿Cuáles son los LMP para Benceno y Tolueno por uso de suelo?",
      r: "Método: NMX-AA-141-SCFI-2007 (BTEX por CG-EM/fotoionización)\n\nBENCENO:\n• Agrícola / Residencial: 6 mg/kg base seca\n• Industrial / Comercial: 15 mg/kg base seca\n\nTOLUENO:\n• Agrícola / Residencial: 40 mg/kg base seca\n• Industrial / Comercial: 100 mg/kg base seca",
      n: "esencial",
    },
    {
      p: "¿Cuáles son los LMP para Etilbenceno y Xilenos por uso de suelo?",
      r: "Método: NMX-AA-141-SCFI-2007\n\nETILBENCENO:\n• Agrícola / Residencial: 10 mg/kg base seca\n• Industrial / Comercial: 25 mg/kg base seca\n\nXILENOS (suma de isómeros orto-, meta- y para-):\n• Agrícola / Residencial: 40 mg/kg base seca\n• Industrial / Comercial: 100 mg/kg base seca",
      n: "esencial",
    },
    {
      p: "¿Cuáles son los LMP para Benzo[a]pireno y Dibenzo[a,h]antraceno?",
      r: "Método: NMX-AA-146-SCFI-2008 (HAP por GC/EM o HPLC)\n\nBENZO[a]PIRENO:\n• Agrícola / Residencial: 2 mg/kg base seca\n• Industrial / Comercial: 10 mg/kg base seca\n\nDIBENZO[a,h]ANTRACENO:\n• Agrícola / Residencial: 2 mg/kg base seca\n• Industrial / Comercial: 10 mg/kg base seca",
      n: "esencial",
    },
    {
      p: "¿Cuántos y cuáles HAP específicos regula la NOM-138 en la TABLA 3?",
      r: "La TABLA 3 regula 6 HAP específicos (todos por NMX-AA-146-SCFI-2008):\n\n1. Benzo[a]pireno → 2 / 10 mg/kg\n2. Dibenzo[a,h]antraceno → 2 / 10 mg/kg\n3. Benzo[a]antraceno → 2 / 10 mg/kg\n4. Benzo[b]fluoranteno → 2 / 10 mg/kg\n5. Benzo[k]fluoranteno → 8 / 80 mg/kg ← el más permisivo\n6. Indeno(1,2,3-cd)pireno → 2 / 10 mg/kg\n\n(valores: agrícola-residencial / industrial)",
      n: "intermedio",
    },
    {
      p: "¿Cuál HAP tiene los LMP más altos (menos restrictivos) en la TABLA 3?",
      r: "BENZO[k]FLUORANTENO tiene los LMP más altos:\n• Agrícola / Residencial: 8 mg/kg base seca\n• Industrial / Comercial: 80 mg/kg base seca\n\nEl resto de los 5 HAP comparten:\n• Agrícola / Residencial: 2 mg/kg\n• Industrial / Comercial: 10 mg/kg\n\nEl LMP industrial de Benzo[k] es 8 veces mayor que los demás HAP.",
      n: "avanzado",
    },
  ],
  muestreo: [
    {
      p: "¿Cuántos puntos de muestreo mínimo requiere un área de hasta 0.1 ha? ¿Y 0.5 ha?",
      r: "Según TABLA 4 de la NOM-138:\n\n• Hasta 0.1 ha → 4 puntos\n• Hasta 0.2 ha → 8 puntos\n• Hasta 0.3 ha → 12 puntos\n• Hasta 0.4 ha → 14 puntos\n• Hasta 0.5 ha → 15 puntos\n• Hasta 1.0 ha → 20 puntos",
      n: "esencial",
    },
    {
      p: "¿Cuántos puntos mínimos se requieren para áreas de 10, 50 y 100 ha?",
      r: "Según TABLA 4:\n• Hasta 10 ha → 38 puntos\n• Hasta 15 ha → 40 puntos\n• Hasta 20 ha → 45 puntos\n• Hasta 30 ha → 50 puntos\n• Hasta 50 ha → 55 puntos\n• Hasta 100 ha → 60 puntos\n\nA mayor área, el incremento de puntos por hectárea es menor.",
      n: "intermedio",
    },
    {
      p: "¿Qué información crítica debe contener el Plan de Muestreo (numeral 7.1)?",
      r: "Entre los 22 elementos requeridos, los más críticos:\n• Objetivo y lugar/fecha\n• Superficie del polígono y zonas de muestreo\n• Hidrocarburos a analizar (TABLA 1)\n• Método: dirigido, estadístico o combinación\n• Número de puntos y muestras (incl. QA/QC)\n• Planos en coordenadas UTM (mín. 60×90 cm)\n• Tipos de recipientes, preservación y transporte\n• Cadena de custodia",
      n: "esencial",
    },
    {
      p: "¿Qué regla aplica para la muestra duplicada de campo?",
      r: "Numeral 7.2.8 de la NOM-138:\n\n• Una muestra duplicada por cada 10 muestras tomadas\n• Para superficies menores a 0.3 ha: también se requiere mínimo una duplicada de campo\n\nEs una medida de aseguramiento de calidad (QA) obligatoria.",
      n: "esencial",
    },
    {
      p: "¿Qué prohíbe la NOM-138 durante el muestreo? ¿Qué tipo de muestra exige?",
      r: "Numeral 7.2.7 — Se debe EVITAR:\n• El uso de fluidos de perforación\n• Equipos y recipientes que causen pérdida de hidrocarburos volátiles\n• La contaminación cruzada entre muestras\n\nNumeral 7.2.5:\nLas muestras de suelo deben ser SIMPLES (individuales, no compuestas).",
      n: "intermedio",
    },
    {
      p: "¿Qué establece la norma sobre el muestreo estadístico y el dirigido?",
      r: "Numeral 7.2.6:\n\nEn el muestreo ESTADÍSTICO no se deben tomar muestras en los MISMOS PUNTOS que los utilizados en el muestreo DIRIGIDO.\n\nAmbos métodos pueden combinarse (7.2.1), pero los puntos de cada uno deben ser independientes entre sí.",
      n: "intermedio",
    },
    {
      p: "¿Qué información mínima debe contener la Cadena de Custodia (numeral 7.4)?",
      r: "• Nombre de empresa y responsable del muestreo\n• Datos de identificación del sitio\n• Fecha, hora y nombre completo de quien tomó la muestra\n• Número o clave única de cada muestra\n• Nombre del laboratorio receptor\n• Determinaciones analíticas requeridas por muestra\n• Número de envases\n• Temperatura y condiciones de preservación en recepción\n• Firmas en cada etapa de entrega/recepción",
      n: "intermedio",
    },
    {
      p: "¿Qué indica la norma sobre el producto contaminante desconocido?",
      r: "Numeral 7.2.10:\nCuando se pueda recuperar una muestra del producto contaminante desconocido, debe ENTREGARSE AL LABORATORIO para su identificación.\n\nNumeral 7.2.9:\nCuando se sospeche la presencia de hidrocarburos ajenos al problema evaluado, se podrán tomar muestras para establecer NIVELES DE FONDO.",
      n: "avanzado",
    },
  ],
  recipientes: [
    {
      p: "¿Qué recipiente y condiciones exige la TABLA 5 para Fracción Ligera y BTEX?",
      r: "TABLA 5 — NOM-138:\n\nRECIPIENTE: Cartucho con contratapa o sello de PTFE (teflón), que asegure la integridad de las muestras hasta su análisis\n\nTEMPERATURA: 4°C\nTIEMPO MÁXIMO: 14 días\n\nSi la consistencia de la muestra no permite cartucho: frasco de vidrio de boca ancha con contratapa/sello de PTFE.",
      n: "esencial",
    },
    {
      p: "¿Qué recipiente se usa para Fracción Media, Pesada y HAP?",
      r: "TABLA 5 — NOM-138:\n\nRECIPIENTE: Frasco de vidrio de BOCA ANCHA con contratapa o sello de PTFE, O cartucho con sello que asegure la integridad\n\nTEMPERATURA: 4°C\nTIEMPO MÁXIMO: 14 días\n\n⚠️ HAP: proteger de la LUZ SOLAR mediante envoltura opaca (Nota 3.2).",
      n: "esencial",
    },
    {
      p: "¿Cuál es el tiempo máximo de conservación para todos los parámetros de la NOM-138?",
      r: "TABLA 5: Para TODOS los parámetros el tiempo máximo es 14 DÍAS a 4°C.\n\nDiferencia importante (Nota 3.1):\n• HAP y Fracción Media: el tiempo aplica hasta la EXTRACCIÓN del analito en laboratorio\n• Fracción Pesada, BTEX y Fracción Ligera: el tiempo aplica hasta el ANÁLISIS",
      n: "esencial",
    },
    {
      p: "¿Qué regla especial aplica al llenar frascos con muestras de Fracción Ligera o BTEX?",
      r: "Numeral 7.3.3 y 7.3.3.1:\n\n1. La muestra de Fracción Ligera y BTEX debe tomarse DE PREFERENCIA en recipientes INDEPENDIENTES.\n\n2. Cuando se usen frascos, deben llenarse AL TOPE (capacidad total), SIN DEJAR ESPACIO.\n\nEsto evita la pérdida de compuestos volátiles hacia el espacio de cabeza (headspace).",
      n: "esencial",
    },
    {
      p: "¿Qué información mínima debe llevar la etiqueta de cada muestra?",
      r: "Numeral 7.3.4.3 — las etiquetas deben incluir:\n• Fecha y hora de toma de la muestra\n• Número o clave única (igual al del sello)\n• Iniciales de la persona que tomó las muestras\n\nEstos datos deben COINCIDIR con los de la cadena de custodia.\n\n⚠️ No se deben analizar muestras cuyos sellos hayan sido VIOLADOS (7.3.4.1).",
      n: "esencial",
    },
    {
      p: "¿Por qué se exige PTFE en las contratapas y qué implica un sello violado?",
      r: "PTFE (politetrafluoretileno / teflón):\nEs inerte a todos los hidrocarburos regulados. No los adsorbe ni los contamina durante transporte y almacenamiento.\n\nSello violado (7.3.4.1):\nNo se deben analizar muestras cuyos sellos hayan sido violados, ya que la integridad y trazabilidad de la muestra no puede garantizarse.",
      n: "intermedio",
    },
  ],
};

// ── TABLAS OFICIALES ──────────────────────────────────────────────

const TABLA1 = [
  { producto: "Mezcla de productos desconocidos / Petróleo crudo", pesada: true, media: true, hap: true, ligera: true, btex: true },
  { producto: "Combustóleo", pesada: true, media: true, hap: false, ligera: false, btex: false },
  { producto: "Parafinas / Petrolatos", pesada: true, media: true, hap: false, ligera: false, btex: false },
  { producto: "Aceites derivados del petróleo / Gasóleo", pesada: true, media: true, hap: false, ligera: false, btex: false },
  { producto: "Diesel", pesada: true, media: true, hap: false, ligera: false, btex: false },
  { producto: "Turbosina / Queroseno", pesada: true, media: true, hap: false, ligera: false, btex: false },
  { producto: "Creosota", pesada: true, media: false, hap: true, ligera: false, btex: false },
  { producto: "Gasavión / Gasolvente", pesada: false, media: false, hap: false, ligera: true, btex: true },
  { producto: "Gasolinas / Gas nafta", pesada: false, media: false, hap: false, ligera: true, btex: true },
];

const TABLA2 = [
  { fraccion: "Fracción Ligera (C5–C10)", agr: "200", res: "200", ind: "500", met: "NMX-AA-105-SCFI-2008" },
  { fraccion: "Fracción Media (C10–C28)", agr: "1,200", res: "1,200", ind: "5,000", met: "NMX-AA-145-SCFI-2008" },
  { fraccion: "Fracción Pesada (C28–C40)", agr: "3,000", res: "3,000", ind: "6,000", met: "NMX-AA-134-SCFI-2006" },
];

const TABLA3 = [
  { comp: "Benceno", agr: "6", res: "6", ind: "15", met: "NMX-AA-141-SCFI-2007" },
  { comp: "Tolueno", agr: "40", res: "40", ind: "100", met: "NMX-AA-141-SCFI-2007" },
  { comp: "Etilbenceno", agr: "10", res: "10", ind: "25", met: "NMX-AA-141-SCFI-2007" },
  { comp: "Xilenos (suma de isómeros)", agr: "40", res: "40", ind: "100", met: "NMX-AA-141-SCFI-2007" },
  { comp: "Benzo[a]pireno", agr: "2", res: "2", ind: "10", met: "NMX-AA-146-SCFI-2008" },
  { comp: "Dibenzo[a,h]antraceno", agr: "2", res: "2", ind: "10", met: "NMX-AA-146-SCFI-2008" },
  { comp: "Benzo[a]antraceno", agr: "2", res: "2", ind: "10", met: "NMX-AA-146-SCFI-2008" },
  { comp: "Benzo[b]fluoranteno", agr: "2", res: "2", ind: "10", met: "NMX-AA-146-SCFI-2008" },
  { comp: "Benzo[k]fluoranteno ★", agr: "8", res: "8", ind: "80", met: "NMX-AA-146-SCFI-2008" },
  { comp: "Indeno(1,2,3-cd)pireno", agr: "2", res: "2", ind: "10", met: "NMX-AA-146-SCFI-2008" },
];

const TABLA4 = [
  ["0.1","4"],["0.2","8"],["0.3","12"],["0.4","14"],["0.5","15"],
  ["0.6","16"],["0.7","17"],["0.8","18"],["0.9","19"],["1.0","20"],
  ["2.0","25"],["3.0","27"],["5.0","33"],["10.0","38"],["15.0","40"],
  ["20.0","45"],["30.0","50"],["40.0","53"],["50.0","55"],["100.0","60"],
];

const TABLA5 = [
  { param: "Fracción Ligera", rec: "Cartucho con contratapa o sello PTFE", temp: "4°C", dias: "14", nota: "Si consistencia no permite cartucho: frasco vidrio boca ancha + PTFE. Tiempo hasta análisis." },
  { param: "BTEX", rec: "Cartucho con contratapa o sello PTFE", temp: "4°C", dias: "14", nota: "Llenar frasco al tope, sin espacio. Preferible recipiente independiente del de F. Ligera. Tiempo hasta análisis." },
  { param: "Fracción Media", rec: "Frasco vidrio boca ancha + PTFE, o cartucho", temp: "4°C", dias: "14", nota: "Tiempo aplica hasta la extracción del analito en laboratorio." },
  { param: "Fracción Pesada", rec: "Frasco vidrio boca ancha + PTFE, o cartucho", temp: "4°C", dias: "14", nota: "Tiempo aplica hasta el análisis." },
  { param: "HAP", rec: "Frasco vidrio boca ancha + PTFE, o cartucho", temp: "4°C", dias: "14", nota: "⚠️ Proteger de luz solar con envoltura opaca. Tiempo hasta extracción." },
];

// ── QUIZ ──────────────────────────────────────────────────────────
// ── BANCO COMPLETO DE PREGUNTAS (40) ─────────────────────────────
const QUIZ_BANK = [
  // ── DEFINICIONES ──
  {
    q: "¿Cómo define la NOM-138 el término 'Derrame'?",
    opts: ["Fuga subterránea de hidrocarburos hacia el acuífero", "Descarga, liberación, rebose o vaciamiento de hidrocarburos en el suelo", "Cualquier accidente industrial que involucre sustancias peligrosas", "Vertimiento de residuos peligrosos en cuerpos de agua"],
    c: 1,
    exp: "Numeral 4.2: Derrame = descarga, liberación, rebose o vaciamiento de hidrocarburos en el suelo. La definición abarca cualquier mecanismo por el que los hidrocarburos llegan al suelo, accidental o por negligencia.",
    cat: "Definiciones",
  },
  {
    q: "¿Qué rango de carbonos corresponde a la Fracción Media según la NOM-138?",
    opts: ["C5 a C10", "C8 a C20", "C10 a C28", "C28 a C40"],
    c: 2,
    exp: "Numeral 4.5: La Fracción Media corresponde a mezclas de hidrocarburos cuyas moléculas contengan entre 10 y 28 átomos de carbono (C10 a C28). Se analiza con NMX-AA-145-SCFI-2008.",
    cat: "Definiciones",
  },
  {
    q: "¿Qué es el 'Nivel de Fondo' según la NOM-138?",
    opts: ["La concentración mínima detectable en el laboratorio", "La concentración de hidrocarburos no atribuible a la fuente contaminante analizada", "El LMP para uso de suelo agrícola", "La concentración de referencia en sitios de alta industrialización"],
    c: 1,
    exp: "Numeral 4.13: Nivel de fondo = concentración en el suelo de hidrocarburos regulados que NO son atribuibles a la fuente de contaminación analizada. Pueden ser de origen natural o de fuente antropogénica ajena, fuera del sitio contaminado.",
    cat: "Definiciones",
  },
  {
    q: "¿Qué es una 'Muestra Simple' según la NOM-138?",
    opts: ["Una muestra tomada por un solo técnico", "Material colectado en un solo punto de muestreo", "La mezcla de varias muestras de un mismo horizonte", "Una muestra sin duplicado de campo"],
    c: 1,
    exp: "Numeral 4.10: Muestra simple = material colectado en un solo punto de muestreo. La NOM-138 exige que todas las muestras de suelo sean simples (numeral 7.2.5), no compuestas.",
    cat: "Definiciones",
  },
  {
    q: "¿Qué significa la sigla PTFE en el contexto de la NOM-138?",
    opts: ["Protocolo de Toma de Fracciones Específicas", "Politetrafluoretileno (teflón)", "Procedimiento Técnico de Frascos y Envases", "Parámetro de Temperatura y Fijación de Extracto"],
    c: 1,
    exp: "Numeral 5.4: PTFE = Politetrafluoretileno, conocido comercialmente como teflón. Es el material requerido para las contratapas y sellos de todos los recipientes de muestreo en la NOM-138, por ser inerte a los hidrocarburos.",
    cat: "Definiciones",
  },
  {
    q: "¿Qué es el 'Muestreo Dirigido' según la NOM-138?",
    opts: ["Muestreo en cuadrícula regular sobre toda el área", "Muestreo sobre puntos determinados con base en información previa o afectación evidente", "Muestreo aleatorio sin criterio previo", "Muestreo exclusivo de zonas periféricas al sitio"],
    c: 1,
    exp: "Numeral 4.11: Muestreo dirigido = el que se lleva a cabo sobre puntos específicamente determinados, cuando se cuenta con información previa del sitio o es evidente la extensión de la afectación. En muestreo estadístico NO se usan los mismos puntos.",
    cat: "Definiciones",
  },
  {
    q: "¿Qué rango de carbonos define la Fracción Ligera según la NOM-138?",
    opts: ["C1 a C5", "C5 a C10", "C10 a C20", "C5 a C28"],
    c: 1,
    exp: "Numeral 4.4: La Fracción Ligera comprende mezclas de hidrocarburos con moléculas de 5 a 10 átomos de carbono (C5 a C10). Incluye gasolinas y solventes ligeros. Método analítico: NMX-AA-105-SCFI-2008.",
    cat: "Definiciones",
  },
  // ── TABLA 1 — PRODUCTOS ──
  {
    q: "Para un derrame de DIESEL, ¿qué fracciones deben analizarse según la TABLA 1?",
    opts: ["Fracción Ligera + BTEX", "Fracción Media + Fracción Pesada", "Todas las fracciones + HAP", "Solo Fracción Pesada"],
    c: 1,
    exp: "TABLA 1: El Diesel requiere Fracción Media (C10–C28) y Fracción Pesada (C28–C40). No requiere Fracción Ligera, BTEX ni HAP, dada su composición como combustible de cadena media-pesada.",
    cat: "Tabla 1",
  },
  {
    q: "¿Cuáles fracciones se analizan para GASOLINAS según la TABLA 1?",
    opts: ["Fracción Media + Fracción Pesada", "Todas las fracciones + BTEX", "Fracción Ligera + BTEX", "Fracción Pesada + HAP"],
    c: 2,
    exp: "TABLA 1: Las Gasolinas requieren Fracción Ligera (C5–C10) + BTEX. Son productos ligeros. No requieren F. Media, F. Pesada ni HAP.",
    cat: "Tabla 1",
  },
  {
    q: "¿Qué producto requiere análisis de HAP además del petróleo crudo y mezclas desconocidas?",
    opts: ["Diesel", "Gasolinas", "Creosota", "Combustóleo"],
    c: 2,
    exp: "TABLA 1: La Creosota requiere Fracción Pesada + HAP. Diesel, gasolinas y combustóleo NO requieren HAP. Solo petróleo crudo, mezclas desconocidas y creosota incluyen HAP.",
    cat: "Tabla 1",
  },
  {
    q: "Para PETRÓLEO CRUDO, ¿cuántas fracciones de la TABLA 1 deben analizarse?",
    opts: ["Solo Fracción Pesada y HAP", "Fracción Ligera, Media y BTEX únicamente", "Las 5 fracciones: Pesada, Media, HAP, Ligera y BTEX", "Fracción Media y Pesada solamente"],
    c: 2,
    exp: "TABLA 1: El Petróleo Crudo requiere TODAS las fracciones: Fracción Pesada, Fracción Media, HAP, Fracción Ligera y BTEX. Lo mismo aplica para 'Mezcla de productos desconocidos derivados del petróleo'.",
    cat: "Tabla 1",
  },
  {
    q: "¿Qué fracciones analíticas requiere el COMBUSTÓLEO según la TABLA 1?",
    opts: ["Fracción Ligera + BTEX", "Fracción Pesada + Fracción Media", "HAP + Fracción Pesada", "Todas las fracciones"],
    c: 1,
    exp: "TABLA 1: El Combustóleo requiere Fracción Pesada (C28–C40) y Fracción Media (C10–C28). No requiere Fracción Ligera, BTEX ni HAP. Igual aplica para Aceites derivados del petróleo, Parafinas, Petrolatos y Gasóleo.",
    cat: "Tabla 1",
  },
  {
    q: "Según la TABLA 1, ¿cuáles productos requieren análisis de BTEX?",
    opts: ["Diesel y Combustóleo", "Gasolinas, Gas nafta, Gasavión y Gasolvente", "Petróleo crudo únicamente", "Todos los productos de la tabla"],
    c: 1,
    exp: "TABLA 1: Los productos que requieren BTEX son: Mezcla de productos desconocidos, Petróleo crudo, Gasolinas, Gas nafta, Gasavión y Gasolvente. Diesel, Combustóleo, Turbosina, Queroseno y Creosota NO requieren BTEX.",
    cat: "Tabla 1",
  },
  // ── LMP FRACCIONES ──
  {
    q: "¿Cuál es el LMP para Fracción Ligera (C5–C10) en suelo de uso industrial y comercial?",
    opts: ["200 mg/kg", "300 mg/kg", "500 mg/kg", "1,200 mg/kg"],
    c: 2,
    exp: "TABLA 2: Fracción Ligera tiene LMP de 200 mg/kg para uso agrícola/residencial y 500 mg/kg para uso industrial y comercial. Método: NMX-AA-105-SCFI-2008.",
    cat: "LMP Fracciones",
  },
  {
    q: "¿Cuál es el LMP para Fracción Media (C10–C28) en suelo de uso industrial y comercial?",
    opts: ["1,200 mg/kg", "3,000 mg/kg", "5,000 mg/kg", "6,000 mg/kg"],
    c: 2,
    exp: "TABLA 2: Fracción Media (C10–C28) tiene LMP de 1,200 mg/kg para uso agrícola y residencial, y 5,000 mg/kg para uso industrial y comercial. Método: NMX-AA-145-SCFI-2008.",
    cat: "LMP Fracciones",
  },
  {
    q: "¿Cuál es el LMP para Fracción Pesada (C28–C40) en suelo de uso residencial y recreativo?",
    opts: ["1,200 mg/kg", "3,000 mg/kg", "5,000 mg/kg", "6,000 mg/kg"],
    c: 1,
    exp: "TABLA 2: Fracción Pesada (C28–C40) tiene LMP de 3,000 mg/kg para uso agrícola/residencial y 6,000 mg/kg para uso industrial. Método: NMX-AA-134-SCFI-2006 (extracción y gravimetría).",
    cat: "LMP Fracciones",
  },
  {
    q: "¿Qué método analítico establece la NOM-138 para la Fracción Pesada?",
    opts: ["NMX-AA-105-SCFI-2008 — GC/FID", "NMX-AA-141-SCFI-2007 — CG-EM/fotoionización", "NMX-AA-134-SCFI-2006 — Extracción y gravimetría", "NMX-AA-145-SCFI-2008 — GC/FID"],
    c: 2,
    exp: "TABLA 2: La Fracción Pesada (C28–C40) se analiza con NMX-AA-134-SCFI-2006, que utiliza extracción y gravimetría. La Fracción Ligera usa NMX-AA-105, la Media usa NMX-AA-145 y BTEX usa NMX-AA-141.",
    cat: "LMP Fracciones",
  },
  {
    q: "Para un sitio con uso de suelo MIXTO residencial-industrial, ¿qué LMP aplica para Fracción Pesada?",
    opts: ["El promedio: 4,500 mg/kg", "El más permisivo: 6,000 mg/kg industrial", "El más estricto: 3,000 mg/kg residencial", "Se define por evaluación de riesgo ambiental"],
    c: 2,
    exp: "NOTA 1 de TABLA 2: Para usos de suelo mixto, debe aplicarse el LMP más estricto. Para F. Pesada: residencial es 3,000 mg/kg (más estricto) vs industrial 6,000 mg/kg. Aplica 3,000 mg/kg.",
    cat: "LMP Fracciones",
  },
  {
    q: "¿Cuál de las tres fracciones de HTP tiene el LMP más alto en uso agrícola?",
    opts: ["Fracción Ligera: 200 mg/kg", "Fracción Media: 1,200 mg/kg", "Fracción Pesada: 3,000 mg/kg", "Todas comparten el mismo LMP"],
    c: 2,
    exp: "TABLA 2: En uso agrícola, Fracción Pesada tiene el LMP más alto (3,000 mg/kg), seguida de Fracción Media (1,200 mg/kg) y Fracción Ligera (200 mg/kg). Los LMP más altos corresponden a fracciones de mayor peso molecular y menor movilidad.",
    cat: "LMP Fracciones",
  },
  // ── LMP ESPECÍFICOS ──
  {
    q: "¿Cuál es el LMP de Benceno en suelo de uso residencial y recreativo?",
    opts: ["2 mg/kg base seca", "6 mg/kg base seca", "15 mg/kg base seca", "40 mg/kg base seca"],
    c: 1,
    exp: "TABLA 3: Benceno tiene LMP de 6 mg/kg base seca para uso agrícola Y residencial/recreativo. Para uso industrial y comercial el límite es 15 mg/kg. Método: NMX-AA-141-SCFI-2007.",
    cat: "LMP Específicos",
  },
  {
    q: "¿Cuál es el LMP de Tolueno en suelo de uso agrícola y residencial?",
    opts: ["10 mg/kg", "40 mg/kg", "100 mg/kg", "200 mg/kg"],
    c: 1,
    exp: "TABLA 3: Tolueno tiene LMP de 40 mg/kg base seca para uso agrícola/residencial y 100 mg/kg para uso industrial/comercial. Al igual que Xilenos. Método: NMX-AA-141-SCFI-2007.",
    cat: "LMP Específicos",
  },
  {
    q: "¿Cuál es el LMP de Etilbenceno en suelo de uso industrial y comercial?",
    opts: ["10 mg/kg", "15 mg/kg", "25 mg/kg", "40 mg/kg"],
    c: 2,
    exp: "TABLA 3: Etilbenceno tiene LMP de 10 mg/kg para uso agrícola/residencial y 25 mg/kg para uso industrial/comercial. Método: NMX-AA-141-SCFI-2007.",
    cat: "LMP Específicos",
  },
  {
    q: "¿Cuál HAP de la TABLA 3 tiene los LMP más altos (menos restrictivos)?",
    opts: ["Benzo[a]pireno", "Benzo[k]fluoranteno", "Indeno(1,2,3-cd)pireno", "Benzo[a]antraceno"],
    c: 1,
    exp: "TABLA 3: Benzo[k]fluoranteno tiene LMP de 8 mg/kg (agrícola/residencial) y 80 mg/kg (industrial). Los otros 5 HAP tienen 2 y 10 mg/kg respectivamente. El LMP industrial de Benzo[k] es 8 veces mayor que los demás HAP.",
    cat: "LMP Específicos",
  },
  {
    q: "¿Cuántos HAP específicos regula la NOM-138 en su TABLA 3?",
    opts: ["3 HAP", "4 HAP", "6 HAP", "16 HAP"],
    c: 2,
    exp: "TABLA 3: La NOM-138 regula 6 HAP específicos: Benzo[a]pireno, Dibenzo[a,h]antraceno, Benzo[a]antraceno, Benzo[b]fluoranteno, Benzo[k]fluoranteno e Indeno(1,2,3-cd)pireno. Todos analizados por NMX-AA-146-SCFI-2008.",
    cat: "LMP Específicos",
  },
  {
    q: "¿Cuál es el LMP de Benzo[a]pireno en suelo de uso industrial y comercial?",
    opts: ["2 mg/kg", "8 mg/kg", "10 mg/kg", "80 mg/kg"],
    c: 2,
    exp: "TABLA 3: Benzo[a]pireno tiene LMP de 2 mg/kg para uso agrícola/residencial y 10 mg/kg para uso industrial/comercial. Lo mismo aplica para Dibenzo[a,h]antraceno, Benzo[a]antraceno, Benzo[b]fluoranteno e Indeno(1,2,3-cd)pireno.",
    cat: "LMP Específicos",
  },
  {
    q: "¿Qué método analítico se usa para los HAP en la NOM-138?",
    opts: ["NMX-AA-134-SCFI-2006 — Gravimetría", "NMX-AA-141-SCFI-2007 — CG-EM/fotoionización", "NMX-AA-146-SCFI-2008 — CG/EM o HPLC", "NMX-AA-105-SCFI-2008 — GC/FID"],
    c: 2,
    exp: "TABLA 3: Los HAP se analizan con NMX-AA-146-SCFI-2008, que utiliza Cromatografía de Gases/Espectrometría de Masas (CG/EM) o Cromatografía de Líquidos de Alta Resolución con detectores de fluorescencia y UV-Vis.",
    cat: "LMP Específicos",
  },
  // ── PLAN DE MUESTREO ──
  {
    q: "¿Cuántos puntos mínimos de muestreo requiere un área contaminada de 0.3 ha?",
    opts: ["8 puntos", "10 puntos", "12 puntos", "15 puntos"],
    c: 2,
    exp: "TABLA 4: para hasta 0.3 ha se requieren mínimo 12 puntos. Para 0.1 ha son 4, para 0.2 ha son 8, para 0.4 ha son 14 y para 0.5 ha son 15 puntos.",
    cat: "Plan de Muestreo",
  },
  {
    q: "¿Cuántos puntos mínimos requiere un área de 1.0 ha según la TABLA 4?",
    opts: ["15 puntos", "18 puntos", "20 puntos", "25 puntos"],
    c: 2,
    exp: "TABLA 4: Para un área de hasta 1.0 ha se requieren mínimo 20 puntos de muestreo. Para 2.0 ha son 25, para 5.0 ha son 33 y para 10.0 ha son 38 puntos.",
    cat: "Plan de Muestreo",
  },
  {
    q: "¿Con qué frecuencia se debe tomar una muestra duplicada de campo?",
    opts: ["Una por cada 5 muestras", "Una por cada 10 muestras", "Una por cada 20 muestras", "Solo si el área supera 1 ha"],
    c: 1,
    exp: "Numeral 7.2.8: una muestra duplicada de campo por cada 10 muestras. Para áreas menores a 0.3 ha también se requiere mínimo una duplicada. Es medida de aseguramiento de calidad (QA) obligatoria.",
    cat: "Plan de Muestreo",
  },
  {
    q: "¿Qué tipo de muestra exige la NOM-138 para el muestreo de suelo?",
    opts: ["Muestras compuestas de cada horizonte", "Muestras integradas por cuadrícula", "Muestras simples (individuales)", "Muestras duplicadas siempre"],
    c: 2,
    exp: "Numeral 7.2.5: Las muestras de suelo deben ser SIMPLES, es decir, colectadas individualmente en un solo punto. No se permiten muestras compuestas (mezcla de varias muestras).",
    cat: "Plan de Muestreo",
  },
  {
    q: "¿Qué establece la NOM-138 respecto a los puntos del muestreo estadístico vs. dirigido?",
    opts: ["Deben coincidir para mayor representatividad", "No deben tomarse en los mismos puntos", "El estadístico reemplaza siempre al dirigido", "Solo se puede aplicar uno de los dos métodos"],
    c: 1,
    exp: "Numeral 7.2.6: En el muestreo ESTADÍSTICO no se deben tomar muestras en los mismos puntos utilizados en el muestreo DIRIGIDO. Ambos pueden combinarse (7.2.1) pero sus puntos deben ser independientes.",
    cat: "Plan de Muestreo",
  },
  {
    q: "¿Qué información deben incluir OBLIGATORIAMENTE los planos del Plan de Muestreo?",
    opts: ["Solo la ubicación de pozos de monitoreo", "Coordenadas UTM, superficie del polígono, puntos de muestreo, vías de acceso y estructuras", "Solo el perímetro del sitio en coordenadas geográficas", "El perfil estratigráfico de cada punto de muestreo"],
    c: 1,
    exp: "Numeral 7.1.14: Los planos deben estar georreferenciados en coordenadas UTM, con tamaño mínimo de 60×90 cm, e indicar: superficie del polígono, ubicación de puntos de muestreo, vías de acceso, edificaciones y estructuras.",
    cat: "Plan de Muestreo",
  },
  {
    q: "¿Cuántos puntos mínimos requiere un área de 100 ha según la TABLA 4?",
    opts: ["45 puntos", "50 puntos", "55 puntos", "60 puntos"],
    c: 3,
    exp: "TABLA 4: Para hasta 100 ha se requieren mínimo 60 puntos de muestreo. Para 50 ha son 55, para 40 ha son 53, para 30 ha son 50. El número crece de forma no lineal: a mayor área, el incremento por hectárea es menor.",
    cat: "Plan de Muestreo",
  },
  {
    q: "¿Qué acción indica la NOM-138 cuando se obtiene un producto contaminante desconocido?",
    opts: ["Desecharlo como residuo peligroso de inmediato", "Entregarlo al laboratorio para su identificación", "Analizarlo con el método de la Fracción Media", "Reportarlo a PROFEPA sin análisis adicional"],
    c: 1,
    exp: "Numeral 7.2.10: Cuando se pueda recuperar una muestra de un producto contaminante desconocido, debe ENTREGARSE AL LABORATORIO para su identificación. Esto permite determinar qué fracciones de la TABLA 1 corresponde analizar.",
    cat: "Plan de Muestreo",
  },
  // ── RECIPIENTES Y CONSERVACIÓN ──
  {
    q: "¿Cuál es el tiempo máximo de conservación para TODOS los parámetros de la NOM-138?",
    opts: ["7 días a 4°C", "14 días a 4°C", "28 días a 4°C", "Varía por parámetro entre 7 y 30 días"],
    c: 1,
    exp: "TABLA 5: Todos los parámetros de la NOM-138 (F. Ligera, BTEX, F. Media, F. Pesada y HAP) tienen el mismo tiempo máximo de conservación: 14 días a 4°C.",
    cat: "Recipientes",
  },
  {
    q: "¿Qué material deben tener las contratapas o sellos de los recipientes?",
    opts: ["Hule natural (látex)", "Polietileno de alta densidad (HDPE)", "PTFE (politetrafluoretileno / teflón)", "Aluminio con recubrimiento epóxico"],
    c: 2,
    exp: "La NOM-138 exige contratapas o sellos de PTFE (Politetrafluoretileno / teflón). Es inerte a todos los hidrocarburos regulados: no los adsorbe ni los contamina durante transporte y almacenamiento.",
    cat: "Recipientes",
  },
  {
    q: "¿Qué establece la NOM-138 sobre el llenado del frasco para muestras de BTEX o Fracción Ligera?",
    opts: ["Dejar 10% de espacio de cabeza para expansión", "Llenar al tope, sin dejar espacio", "Llenar al 75% de capacidad", "No aplica, siempre se usan cartuchos"],
    c: 1,
    exp: "Numeral 7.3.3.1: cuando se usen frascos, deben llenarse al TOPE (capacidad total), SIN DEJAR ESPACIO. Esto evita la pérdida de compuestos volátiles al headspace. Es crítico para la integridad de la muestra.",
    cat: "Recipientes",
  },
  {
    q: "¿Qué cuidado especial requieren las muestras de HAP durante el transporte?",
    opts: ["Acidificarlas con HCl para estabilizar los analitos", "Mantenerlas a -20°C durante el transporte", "Protegerlas de la luz solar con envoltura opaca", "Agitarlas antes del análisis para homogenizar"],
    c: 2,
    exp: "TABLA 5, Nota 3.2: las muestras de HAP deben protegerse de los efectos de la LUZ SOLAR mediante algún tipo de envoltura opaca. Los HAP son fotosensibles y pueden degradarse rápidamente por exposición a la radiación.",
    cat: "Recipientes",
  },
  {
    q: "Para HAP y Fracción Media, ¿hasta qué momento aplica el tiempo de 14 días de conservación?",
    opts: ["Hasta el análisis cromatográfico final", "Hasta la extracción del analito en el laboratorio", "Hasta la recepción en el laboratorio", "Hasta la preparación del extracto para inyección"],
    c: 1,
    exp: "TABLA 5, Nota 3.1: Para HAP y Fracción Media, el tiempo máximo de 14 días aplica desde la toma de muestra hasta la EXTRACCIÓN del analito en laboratorio. Para F. Pesada, BTEX y F. Ligera, aplica hasta el ANÁLISIS.",
    cat: "Recipientes",
  },
  {
    q: "¿Qué establece la NOM-138 sobre muestras cuyos sellos hayan sido violados?",
    opts: ["Se pueden analizar solo para parámetros no volátiles", "No deben ser analizadas", "Deben re-muestrearse antes de 48 horas", "Se puede aceptar con nota en la cadena de custodia"],
    c: 1,
    exp: "Numeral 7.3.4.1: No se deben analizar muestras cuyos sellos hayan sido violados. La integridad del sello garantiza la trazabilidad y representatividad de la muestra. Un sello violado invalida la muestra.",
    cat: "Recipientes",
  },
  {
    q: "¿Qué información mínima deben incluir las etiquetas de las muestras?",
    opts: ["Solo el número de muestra y el laboratorio destino", "Fecha/hora de toma, clave única y nombre del muestreador", "Fecha/hora, número o clave única, e iniciales del muestreador", "Nombre del sitio, profundidad y parámetros a analizar"],
    c: 2,
    exp: "Numeral 7.3.4.3: Las etiquetas deben incluir: fecha y hora de la toma, número o clave única (igual al sello) e iniciales del muestreador. Estos datos deben coincidir con los de la cadena de custodia.",
    cat: "Recipientes",
  },
  {
    q: "¿Qué recipiente establece la NOM-138 para muestras de Fracción Ligera y BTEX?",
    opts: ["Botella HDPE transparente de 1 L", "Frasco de vidrio boca ancha con sello PTFE", "Cartucho con contratapa o sello PTFE", "Bolsa Ziploc de polietileno sellada al vacío"],
    c: 2,
    exp: "TABLA 5: Para Fracción Ligera y BTEX se requiere CARTUCHO con contratapa o sello de PTFE que asegure la integridad hasta el análisis. Si la consistencia de la muestra no permite cartucho, se permite frasco de vidrio boca ancha con sello PTFE.",
    cat: "Recipientes",
  },
  // ── CADENA DE CUSTODIA ──
  {
    q: "¿Cuál de los siguientes datos NO forma parte de la Cadena de Custodia según la NOM-138?",
    opts: ["Nombre del laboratorio que recibe las muestras", "Temperatura de preservación en recepción", "Precio del análisis por muestra", "Identificación de las personas en cada etapa de transporte"],
    c: 2,
    exp: "Numeral 7.4: La cadena de custodia debe incluir datos de identificación del sitio, fechas y firmas, claves de muestra, nombre del laboratorio, determinaciones analíticas, temperatura en recepción y participantes en cada etapa. El precio del análisis no es un requisito de la norma.",
    cat: "Cadena de Custodia",
  },
  {
    q: "¿Qué establece la NOM-138 sobre la remediación cuando el nivel de fondo supera los LMP?",
    opts: ["Se aplica igual el LMP de la TABLA 2 o 3", "La remediación se realiza hasta alcanzar el nivel de fondo", "No se requiere remediación en ese caso", "Se define por evaluación de riesgo obligatoria"],
    c: 1,
    exp: "Numeral 8.4: Cuando los niveles de fondo de hidrocarburos sean mayores a los LMP de las TABLAS 2 y 3, la remediación se realizará hasta alcanzar esos niveles de fondo, siempre que estén incluidos en la propuesta aprobada por la Secretaría.",
    cat: "Remediación",
  },
];

// Función de mezcla aleatoria (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QUIZ_SIZES = [10, 15, 20, QUIZ_BANK.length];

// ══════════════════════════════════════════════════════════════════
// ESTILOS
// ══════════════════════════════════════════════════════════════════
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Archivo:wght@400;600;700;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#08090D;--s1:#0F111A;--s2:#171A27;--bd:#232840;
    --txt:#DDE3F5;--mut:#505880;--acc:#F0C040;
    --grn:#22D3A0;--red:#F05070;--ind:#7C82FF;--pin:#F070B0;--tel:#20D8C8;
  }
  body{background:var(--bg);color:var(--txt);font-family:'Archivo',sans-serif;min-height:100vh}
  .app{max-width:820px;margin:0 auto;padding:16px 14px 52px}

  .hdr{padding:28px 0 22px;text-align:center;border-bottom:1px solid var(--bd)}
  .hdr-tag{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:4px;color:var(--acc);text-transform:uppercase;margin-bottom:10px}
  .hdr h1{font-size:clamp(17px,4.5vw,24px);font-weight:900;line-height:1.2}
  .hdr h1 em{color:var(--acc);font-style:normal}
  .hdr p{color:var(--mut);font-size:11px;margin-top:8px;font-family:'IBM Plex Mono',monospace}

  .nav{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;padding:14px 0}
  .nb{padding:7px 16px;border-radius:6px;border:1px solid var(--bd);background:var(--s1);color:var(--mut);font-family:'Archivo',sans-serif;font-size:12px;font-weight:700;cursor:pointer;transition:.2s all;letter-spacing:.3px}
  .nb:hover:not(.act){border-color:var(--acc);color:var(--acc)}
  .nb.act{background:var(--acc);color:#08090D;border-color:var(--acc)}

  .stats{display:flex;gap:8px;margin:4px 0 16px}
  .sc{flex:1;background:var(--s1);border:1px solid var(--bd);border-radius:8px;padding:14px 10px;text-align:center}
  .sn{font-family:'IBM Plex Mono',monospace;font-size:24px;font-weight:700}
  .sl{font-size:10px;color:var(--mut);margin-top:4px;text-transform:uppercase;letter-spacing:1px}
  .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
  @media(min-width:560px){.grid{grid-template-columns:repeat(3,1fr)}}
  .mc{background:var(--s1);border:1px solid var(--bd);border-radius:10px;padding:20px 14px 16px;cursor:pointer;transition:.2s all;text-align:center;position:relative;overflow:hidden}
  .mc:hover{transform:translateY(-3px);border-color:var(--mc)}
  .mc .icon{font-size:28px;margin-bottom:10px}
  .mc h3{font-size:12px;font-weight:700;line-height:1.35}
  .mc .ct{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--mut);margin-top:6px}

  .fh{display:flex;align-items:center;gap:12px;margin-bottom:16px}
  .bk{background:var(--s1);border:1px solid var(--bd);color:var(--mut);padding:7px 14px;border-radius:6px;cursor:pointer;font-family:'Archivo',sans-serif;font-size:12px;font-weight:700;transition:.2s all}
  .bk:hover{border-color:var(--acc);color:var(--acc)}
  .ft{font-weight:700;font-size:14px}
  .pbar{height:3px;background:var(--bd);border-radius:3px;margin-bottom:16px;overflow:hidden}
  .pf{height:100%;background:var(--acc);border-radius:3px;transition:width .4s}
  .plbl{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--mut);text-align:right;margin-bottom:6px}
  .card{background:var(--s1);border:1px solid var(--bd);border-radius:12px;min-height:260px;display:flex;flex-direction:column;justify-content:center;padding:24px 20px;cursor:pointer;transition:.3s all}
  .card:hover{box-shadow:0 0 0 1px var(--acc)33,0 8px 28px #00000060}
  .cside{font-family:'IBM Plex Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--mut);margin-bottom:14px}
  .cq{font-size:16px;font-weight:700;line-height:1.5}
  .cr{font-size:13px;line-height:1.8;white-space:pre-line}
  .nbl{display:inline-block;padding:3px 11px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-top:14px}
  .nb-esencial{background:#F0C04022;color:var(--acc);border:1px solid #F0C04044}
  .nb-intermedio{background:#7C82FF22;color:var(--ind);border:1px solid #7C82FF44}
  .nb-avanzado{background:#F0507022;color:var(--red);border:1px solid #F0507044}
  .hint{text-align:center;color:var(--mut);font-size:11px;margin:12px 0;font-family:'IBM Plex Mono',monospace}
  .ca{display:flex;gap:8px;margin-top:12px}
  .ca button{flex:1;padding:11px 8px;border-radius:8px;font-family:'Archivo',sans-serif;font-size:12px;font-weight:700;cursor:pointer;transition:.2s all;border:1px solid}
  .caw{background:#F0507011;border-color:#F0507044;color:var(--red)}
  .cak{background:#232840;border-color:var(--bd);color:var(--mut)}
  .car{background:#22D3A011;border-color:#22D3A044;color:var(--grn)}

  .qq{font-size:15px;font-weight:700;line-height:1.5;margin-bottom:16px;padding:18px 18px;background:var(--s1);border:1px solid var(--bd);border-radius:10px}
  .qopts{display:flex;flex-direction:column;gap:8px}
  .qo{padding:12px 15px;background:var(--s1);border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:13px;line-height:1.4;transition:.2s all;text-align:left;color:var(--txt);font-family:'Archivo',sans-serif;font-weight:600}
  .qo:hover:not(:disabled){border-color:var(--acc);color:var(--acc)}
  .qo.cor{background:#22D3A011;border-color:var(--grn);color:var(--grn)}
  .qo.wrg{background:#F0507011;border-color:var(--red);color:var(--red)}
  .qo:disabled{cursor:default}
  .qfb{padding:14px 16px;border-radius:8px;margin-top:12px;font-size:12.5px;line-height:1.65}
  .fbc{background:#22D3A011;border:1px solid #22D3A044;color:#7EEFD4}
  .fbw{background:#F0507011;border:1px solid #F0507044;color:#FCA5B5}
  .qnxt{width:100%;margin-top:12px;padding:13px;background:var(--acc);color:#08090D;border:none;border-radius:8px;font-family:'Archivo',sans-serif;font-size:14px;font-weight:900;cursor:pointer}
  .qnxt:hover{background:#FFD96A}
  .scb{text-align:center;padding:48px 16px}
  .snum{font-size:80px;font-weight:900;color:var(--acc);font-family:'IBM Plex Mono',monospace;line-height:1}
  .slbl{color:var(--mut);font-size:12px;margin-top:8px;font-family:'IBM Plex Mono',monospace}
  .smsg{font-size:19px;font-weight:700;margin:22px 0 8px}
  .srst{padding:12px 28px;background:var(--acc);color:#08090D;border:none;border-radius:8px;font-family:'Archivo',sans-serif;font-size:14px;font-weight:900;cursor:pointer;margin-top:16px}

  .sec-t{font-size:13px;font-weight:700;margin:18px 0 4px;color:var(--acc);font-family:'IBM Plex Mono',monospace;letter-spacing:1px;text-transform:uppercase}
  .sec-s{font-size:11px;color:var(--mut);margin-bottom:12px;font-family:'IBM Plex Mono',monospace;line-height:1.5}
  .tw{overflow-x:auto;border-radius:8px;border:1px solid var(--bd);margin-bottom:20px}
  table{width:100%;border-collapse:collapse;font-size:12px}
  th{background:var(--s2);padding:10px 11px;text-align:left;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:var(--acc);font-family:'IBM Plex Mono',monospace;border-bottom:1px solid var(--bd);white-space:nowrap}
  td{padding:10px 11px;border-bottom:1px solid #23284055;vertical-align:top;line-height:1.5}
  tr:last-child td{border-bottom:none}
  tr:nth-child(even) td{background:#FFFFFF03}
  .chk{color:var(--grn);font-weight:900;font-size:14px}
  .dash{color:var(--bd);font-size:14px}
  .mono{font-family:'IBM Plex Mono',monospace;font-size:11px}
  .hi{color:var(--acc);font-weight:700}
  .note{font-size:11px;color:var(--mut);margin-top:10px;font-family:'IBM Plex Mono',monospace;line-height:1.75;padding:10px 14px;background:var(--s1);border-left:2px solid var(--acc);border-radius:0 6px 6px 0}
  .t1tag{display:inline-block;padding:1px 8px;border-radius:10px;font-size:9px;font-weight:700;white-space:nowrap}
`;

// ══════════════════════════════════════════════════════════════════
// APP
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("home");
  const [mod, setMod] = useState(null);
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [score, setScore] = useState({ r: 0, w: 0 });
  const [qst, setQst] = useState({ i: 0, sel: null, done: false, cor: 0 });
  const [tabRef, setTabRef] = useState("t1");
  const [qSize, setQSize] = useState(10);
  const [activeQ, setActiveQ] = useState(() => shuffle(QUIZ_BANK).slice(0, 10));
  const [showCfg, setShowCfg] = useState(false);

  const cards = mod ? FLASHCARDS[mod] : [];
  const card = cards[idx];
  const curQ = activeQ[qst.i];

  function openFlash(m) {
    setMod(m); setIdx(0); setFlip(false); setScore({ r: 0, w: 0 }); setView("flash");
  }
  function next(res) {
    if (res === "r") setScore(s => ({ ...s, r: s.r + 1 }));
    if (res === "w") setScore(s => ({ ...s, w: s.w + 1 }));
    if (idx + 1 < cards.length) { setIdx(i => i + 1); setFlip(false); }
    else setView("fdone");
  }
  function selAns(i) {
    if (qst.sel !== null) return;
    setQst(s => ({ ...s, sel: i, cor: s.cor + (i === curQ.c ? 1 : 0) }));
  }
  function nextQ() {
    if (qst.i + 1 >= activeQ.length) setQst(s => ({ ...s, done: true }));
    else setQst(s => ({ ...s, i: s.i + 1, sel: null }));
  }
  function startQuiz(size) {
    const n = size || qSize;
    setActiveQ(shuffle(QUIZ_BANK).slice(0, n));
    setQst({ i: 0, sel: null, done: false, cor: 0 });
    setShowCfg(false);
  }
  function restartQ() { startQuiz(qSize); }
  const pct = Math.round((qst.cor / activeQ.length) * 100);

  const TABS = [
    ["t1","TABLA 1"],["t2","TABLA 2"],["t3","TABLA 3"],["t4","TABLA 4"],["t5","TABLA 5"],
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* HEADER */}
        <div className="hdr">
          <div className="hdr-tag">▶ NOM-138-SEMARNAT/SSA1-2012</div>
          <h1>Límites Máximos Permisibles de<br /><em>Hidrocarburos en Suelos</em></h1>
          <p>Muestreo · Caracterización · Remediación · DOF 10-09-2013</p>
        </div>

        {/* TOP NAV */}
        {view !== "flash" && view !== "fdone" && (
          <div className="nav">
            <button className={`nb ${view==="home"?"act":""}`} onClick={() => setView("home")}>📚 Módulos</button>
            <button className={`nb ${view==="quiz"?"act":""}`} onClick={() => { setView("quiz"); setShowCfg(true); }}>🧠 Autoevaluación</button>
            <button className={`nb ${view==="tabs"?"act":""}`} onClick={() => setView("tabs")}>📊 Tablas Norma</button>
          </div>
        )}

        {/* ── HOME ── */}
        {view === "home" && (
          <>
            <div className="stats">
              <div className="sc"><div className="sn" style={{color:"var(--acc)"}}>{Object.values(FLASHCARDS).reduce((a,v)=>a+v.length,0)}</div><div className="sl">Tarjetas</div></div>
              <div className="sc"><div className="sn" style={{color:"var(--grn)"}}>{MODULES.length}</div><div className="sl">Módulos</div></div>
              <div className="sc"><div className="sn" style={{color:"var(--ind)"}}>{QUIZ_BANK.length}</div><div className="sl">Preguntas</div></div>
            </div>
            <div className="grid">
              {MODULES.map(m => (
                <div key={m.id} className="mc" style={{"--mc":m.color}} onClick={() => openFlash(m.id)}>
                  <div style={{position:"absolute",inset:0,background:m.color,opacity:.05,borderRadius:10}}/>
                  <div className="icon">{m.icon}</div>
                  <h3>{m.label}</h3>
                  <div className="ct">{FLASHCARDS[m.id].length} tarjetas →</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── FLASH ── */}
        {view === "flash" && card && (
          <>
            <div className="fh">
              <button className="bk" onClick={() => setView("home")}>← Volver</button>
              <div className="ft">{MODULES.find(m=>m.id===mod)?.label}</div>
            </div>
            <div className="plbl">{idx+1} / {cards.length} · ✓ {score.r} · ✗ {score.w}</div>
            <div className="pbar"><div className="pf" style={{width:`${(idx/cards.length)*100}%`}}/></div>
            <div className="card" onClick={() => setFlip(f=>!f)}>
              <div className="cside">{flip ? "◀ Respuesta" : "▶ Pregunta — toca para revelar"}</div>
              {!flip
                ? <div className="cq">{card.p}</div>
                : <><div className="cr">{card.r}</div><div className={`nbl nb-${card.n}`}>{card.n}</div></>
              }
            </div>
            <p className="hint">{flip ? "¿Cómo te fue?" : "Toca la tarjeta para ver la respuesta"}</p>
            {flip && (
              <div className="ca">
                <button className="caw" onClick={() => next("w")}>✗ A repasar</button>
                <button className="cak" onClick={() => next("s")}>→ Saltar</button>
                <button className="car" onClick={() => next("r")}>✓ Lo sé</button>
              </div>
            )}
          </>
        )}

        {/* ── FLASH DONE ── */}
        {view === "fdone" && (
          <div className="scb">
            <div className="snum">{Math.round((score.r/(score.r+score.w||1))*100)}%</div>
            <div className="slbl">de respuestas correctas</div>
            <div className="smsg">{score.r>=cards.length*.8?"¡Módulo dominado! 🏆":score.r>=cards.length*.6?"Buen avance 📚":"Sigue practicando 💪"}</div>
            <p style={{color:"var(--mut)",fontSize:13}}>✓ {score.r} correctas · ✗ {score.w} a repasar</p>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:24,flexWrap:"wrap"}}>
              <button className="srst" onClick={()=>openFlash(mod)}>🔁 Repetir módulo</button>
              <button className="srst" style={{background:"var(--s2)",color:"var(--txt)",border:"1px solid var(--bd)"}} onClick={()=>setView("home")}>← Módulos</button>
            </div>
          </div>
        )}

        {/* ── QUIZ CONFIG ── */}
        {view === "quiz" && showCfg && (
          <div style={{padding:"8px 0"}}>
            <p style={{fontSize:13,color:"var(--mut)",marginBottom:20,fontFamily:"IBM Plex Mono,monospace",lineHeight:1.6}}>
              Banco total: <strong style={{color:"var(--acc)"}}>{QUIZ_BANK.length} preguntas</strong> — cada sesión selecciona un subconjunto aleatorio diferente.
            </p>
            <p style={{fontSize:12,fontWeight:700,marginBottom:12,textTransform:"uppercase",letterSpacing:1,color:"var(--mut)"}}>¿Cuántas preguntas por sesión?</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,maxWidth:400}}>
              {[10,15,20,QUIZ_BANK.length].map(n => (
                <button key={n}
                  onClick={() => { setQSize(n); startQuiz(n); setShowCfg(false); }}
                  style={{
                    padding:"18px 12px", borderRadius:10, cursor:"pointer", fontFamily:"Archivo,sans-serif",
                    fontWeight:700, fontSize:15, transition:".2s all",
                    background: n === qSize ? "var(--acc)" : "var(--s1)",
                    color: n === qSize ? "#08090D" : "var(--txt)",
                    border: `1px solid ${n === qSize ? "var(--acc)" : "var(--bd)"}`,
                  }}>
                  {n === QUIZ_BANK.length ? `Todas (${n})` : `${n} preguntas`}
                  <div style={{fontSize:10,opacity:.6,marginTop:4,fontWeight:400}}>
                    {n===10?"Sesión rápida":n===15?"Estándar":n===20?"Completa":"Banco completo"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── QUIZ ACTIVE ── */}
        {view === "quiz" && !showCfg && !qst.done && curQ && (
          <>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div className="plbl" style={{marginBottom:0}}>Pregunta {qst.i+1} / {activeQ.length} · ✓ {qst.cor}</div>
              <span style={{fontFamily:"IBM Plex Mono,monospace",fontSize:9,color:"var(--mut)",background:"var(--s2)",padding:"3px 8px",borderRadius:10,border:"1px solid var(--bd)"}}>
                {curQ.cat}
              </span>
            </div>
            <div className="pbar"><div className="pf" style={{width:`${(qst.i/activeQ.length)*100}%`}}/></div>
            <div className="qq">{curQ.q}</div>
            <div className="qopts">
              {curQ.opts.map((o,i) => (
                <button key={i}
                  className={`qo ${qst.sel!==null?(i===curQ.c?"cor":i===qst.sel?"wrg":""):""}`}
                  onClick={() => selAns(i)} disabled={qst.sel!==null}>
                  <span className="mono" style={{marginRight:10,opacity:.5}}>{String.fromCharCode(65+i)}.</span>{o}
                </button>
              ))}
            </div>
            {qst.sel !== null && (
              <>
                <div className={`qfb ${qst.sel===curQ.c?"fbc":"fbw"}`}>
                  <strong>{qst.sel===curQ.c?"✓ ¡Correcto!":"✗ Incorrecto"}</strong><br/><br/>{curQ.exp}
                </div>
                <button className="qnxt" onClick={nextQ}>
                  {qst.i+1<activeQ.length?"Siguiente →":"Ver resultados"}
                </button>
              </>
            )}
          </>
        )}
        {view === "quiz" && !showCfg && qst.done && (
          <div className="scb">
            <div className="snum">{pct}%</div>
            <div className="slbl">{qst.cor} de {activeQ.length} correctas</div>
            <div className="smsg">{pct>=80?"¡Excelente dominio de la norma! 🏆":pct>=60?"Buen avance, sigue repasando 📚":"Necesitas más práctica 💪"}</div>
            <p style={{color:"var(--mut)",fontSize:12,marginTop:8,fontFamily:"IBM Plex Mono,monospace"}}>Sesión de {activeQ.length} preguntas · banco de {QUIZ_BANK.length}</p>
            <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:24,flexWrap:"wrap"}}>
              <button className="srst" onClick={restartQ}>🔀 Nueva selección aleatoria</button>
              <button className="srst" style={{background:"var(--s2)",color:"var(--txt)",border:"1px solid var(--bd)"}} onClick={() => setShowCfg(true)}>⚙️ Cambiar tamaño</button>
            </div>
          </div>
        )}

        {/* ── TABLAS NORMA ── */}
        {view === "tabs" && (
          <>
            <div className="nav" style={{marginTop:4,marginBottom:8}}>
              {TABS.map(([k,l]) => (
                <button key={k} className={`nb ${tabRef===k?"act":""}`} onClick={()=>setTabRef(k)} style={{fontSize:11}}>{l}</button>
              ))}
            </div>

            {/* T1 */}
            {tabRef==="t1" && (<>
              <div className="sec-t">TABLA 1</div>
              <div className="sec-s">Hidrocarburos que deberán analizarse en función del producto contaminante</div>
              <div className="tw"><table>
                <thead><tr>
                  <th>Producto Contaminante</th>
                  <th style={{background:"#F0C04018"}}>F. Pesada<br/><span style={{fontSize:9,color:"#F0C04099"}}>C28–C40</span></th>
                  <th style={{background:"#22D3A018"}}>F. Media<br/><span style={{fontSize:9,color:"#22D3A099"}}>C10–C28</span></th>
                  <th style={{background:"#F070B018"}}>HAP</th>
                  <th style={{background:"#20D8C818"}}>F. Ligera<br/><span style={{fontSize:9,color:"#20D8C899"}}>C5–C10</span></th>
                  <th style={{background:"#7C82FF18"}}>BTEX</th>
                </tr></thead>
                <tbody>
                  {TABLA1.map((r,i) => (
                    <tr key={i}>
                      <td style={{fontWeight:600,fontSize:11}}>{r.producto}</td>
                      <td style={{textAlign:"center"}}>{r.pesada?<span className="chk">✓</span>:<span className="dash">–</span>}</td>
                      <td style={{textAlign:"center"}}>{r.media?<span className="chk">✓</span>:<span className="dash">–</span>}</td>
                      <td style={{textAlign:"center"}}>{r.hap?<span className="chk">✓</span>:<span className="dash">–</span>}</td>
                      <td style={{textAlign:"center"}}>{r.ligera?<span className="chk">✓</span>:<span className="dash">–</span>}</td>
                      <td style={{textAlign:"center"}}>{r.btex?<span className="chk">✓</span>:<span className="dash">–</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
            </>)}

            {/* T2 */}
            {tabRef==="t2" && (<>
              <div className="sec-t">TABLA 2</div>
              <div className="sec-s">LMP para fracciones de hidrocarburos en suelo (mg/kg base seca)</div>
              <div className="tw"><table>
                <thead><tr>
                  <th>Fracción de Hidrocarburos</th>
                  <th>Agrícola / Forestal / Pecuario / Conservación</th>
                  <th>Residencial / Recreativo</th>
                  <th>Industrial / Comercial</th>
                  <th>Método Analítico</th>
                </tr></thead>
                <tbody>
                  {TABLA2.map((r,i) => (
                    <tr key={i}>
                      <td style={{fontWeight:700}}>{r.fraccion}</td>
                      <td className="mono">{r.agr}</td>
                      <td className="mono">{r.res}</td>
                      <td className="mono hi">{r.ind}</td>
                      <td className="mono" style={{color:"var(--mut)",fontSize:10}}>{r.met}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
              <div className="note">📌 Nota 1: Para uso de suelo mixto, aplica el LMP más estricto de los usos involucrados.</div>
            </>)}

            {/* T3 */}
            {tabRef==="t3" && (<>
              <div className="sec-t">TABLA 3</div>
              <div className="sec-s">LMP para hidrocarburos específicos en suelo (mg/kg base seca)</div>
              <div className="tw"><table>
                <thead><tr>
                  <th>Compuesto</th>
                  <th>Agrícola / Conservación</th>
                  <th>Residencial / Recreativo</th>
                  <th>Industrial / Comercial</th>
                  <th>Método</th>
                </tr></thead>
                <tbody>
                  {TABLA3.map((r,i) => (
                    <tr key={i}>
                      <td style={{fontWeight:700}}>{r.comp}</td>
                      <td className="mono">{r.agr}</td>
                      <td className="mono">{r.res}</td>
                      <td className="mono hi">{r.ind}</td>
                      <td className="mono" style={{color:"var(--mut)",fontSize:10}}>{r.met}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
              <div className="note">📌 Nota 2: Para uso de suelo mixto, aplica el LMP más estricto. ★ Benzo[k]fluoranteno tiene los LMP más altos de todos los HAP de la tabla.</div>
            </>)}

            {/* T4 */}
            {tabRef==="t4" && (<>
              <div className="sec-t">TABLA 4</div>
              <div className="sec-s">Número mínimo de puntos de muestreo de acuerdo con el área contaminada</div>
              <div className="tw"><table>
                <thead><tr>
                  <th>Área contaminada (ha)</th>
                  <th>Puntos de muestreo mínimos</th>
                </tr></thead>
                <tbody>
                  {TABLA4.map(([a,p],i) => (
                    <tr key={i}>
                      <td className="mono">hasta {a} ha</td>
                      <td className="mono hi" style={{fontWeight:700}}>{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
              <div className="note">
                📌 Numeral 7.2.8: 1 muestra duplicada de campo por cada 10 muestras tomadas.<br/>
                📌 Para áreas menores a 0.3 ha: mínimo 1 muestra duplicada de campo.<br/>
                📌 Numeral 7.2.5: Las muestras deben ser SIMPLES (no compuestas).
              </div>
            </>)}

            {/* T5 */}
            {tabRef==="t5" && (<>
              <div className="sec-t">TABLA 5</div>
              <div className="sec-s">Recipientes, temperatura de preservación y tiempo máximo de conservación por parámetro</div>
              <div className="tw"><table>
                <thead><tr>
                  <th>Parámetro</th>
                  <th>Tipo de Recipiente</th>
                  <th>Temp.</th>
                  <th>Días máx.</th>
                  <th>Notas</th>
                </tr></thead>
                <tbody>
                  {TABLA5.map((r,i) => (
                    <tr key={i}>
                      <td style={{fontWeight:700}}>{r.param}</td>
                      <td style={{fontSize:11}}>{r.rec}</td>
                      <td className="mono" style={{color:"var(--grn)",textAlign:"center"}}>{r.temp}</td>
                      <td className="mono hi" style={{textAlign:"center",fontWeight:700}}>{r.dias}</td>
                      <td style={{color:"var(--mut)",fontSize:11}}>{r.nota}</td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
              <div className="note">
                📌 PTFE = Politetrafluoretileno (teflón): material requerido para todas las contratapas y sellos.<br/>
                📌 HAP y Fracción Media: el tiempo aplica hasta la extracción del analito en laboratorio.<br/>
                📌 F. Pesada, BTEX y F. Ligera: el tiempo aplica hasta el análisis final.<br/>
                📌 Numeral 7.3.4.1: No se analizarán muestras cuyos sellos hayan sido violados.
              </div>
            </>)}
          </>
        )}

        <div style={{textAlign:"center",marginTop:40,paddingTop:18,borderTop:"1px solid var(--bd)",color:"var(--mut)",fontSize:10,fontFamily:"IBM Plex Mono,monospace"}}>
          NOM-138-SEMARNAT/SSA1-2012 · DOF 10 septiembre 2013 · Herramienta de estudio
        </div>
      </div>
    </>
  );
}
