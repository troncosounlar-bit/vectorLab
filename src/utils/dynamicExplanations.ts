// Genera explicaciones dinámicas basadas en el vector real procesado

export interface AlgorithmUsed {
  name: string;
  description: string;
  code: string;
}

export interface DynamicExplanation {
  howItWorks: string;
  algorithms: AlgorithmUsed[];
}

// Genera pasos detallados de la suma
function generateSumaSteps(vector: number[]): string {
  if (vector.length === 0) return "Vector vacío";
  
  let steps = "Paso a paso:\n\n";
  steps += `Inicialización: suma = 0\n\n`;
  
  let sumaAcumulada = 0;
  vector.forEach((num, index) => {
    const nuevaSuma = sumaAcumulada + num;
    steps += `Iteración ${index}: suma = ${sumaAcumulada} + ${num} = ${nuevaSuma}\n`;
    sumaAcumulada = nuevaSuma;
  });
  
  steps += `\nResultado final: ${sumaAcumulada}`;
  return steps;
}

// Genera pasos detallados del promedio
function generatePromedioSteps(vector: number[], suma: number, promedio: number): string {
  if (vector.length === 0) return "Vector vacío";
  
  let steps = "Paso a paso:\n\n";
  steps += `1. Calcular suma total: ${suma}\n`;
  steps += `2. Contar elementos: ${vector.length}\n`;
  steps += `3. Dividir: ${suma} ÷ ${vector.length} = ${promedio.toFixed(2)}`;
  
  return steps;
}

// Genera pasos detallados para encontrar el máximo
function generateMaximoSteps(vector: number[]): string {
  if (vector.length === 0) return "Vector vacío";
  
  let steps = "Comparaciones paso a paso:\n\n";
  steps += `Inicialización: maximo = ${vector[0]} (primer elemento)\n\n`;
  
  let maxActual = vector[0];
  for (let i = 1; i < vector.length; i++) {
    if (vector[i] > maxActual) {
      steps += `Comparar ${vector[i]} > ${maxActual}? SÍ → nuevo máximo = ${vector[i]}\n`;
      maxActual = vector[i];
    } else {
      steps += `Comparar ${vector[i]} > ${maxActual}? NO → mantener máximo = ${maxActual}\n`;
    }
  }
  
  steps += `\nResultado final: ${maxActual}`;
  return steps;
}

// Genera pasos detallados para encontrar el mínimo
function generateMinimoSteps(vector: number[]): string {
  if (vector.length === 0) return "Vector vacío";
  
  let steps = "Comparaciones paso a paso:\n\n";
  steps += `Inicialización: minimo = ${vector[0]} (primer elemento)\n\n`;
  
  let minActual = vector[0];
  for (let i = 1; i < vector.length; i++) {
    if (vector[i] < minActual) {
      steps += `Comparar ${vector[i]} < ${minActual}? SÍ → nuevo mínimo = ${vector[i]}\n`;
      minActual = vector[i];
    } else {
      steps += `Comparar ${vector[i]} < ${minActual}? NO → mantener mínimo = ${minActual}\n`;
    }
  }
  
  steps += `\nResultado final: ${minActual}`;
  return steps;
}

// Genera pasos detallados para clasificar positivos/negativos
function generateClasificacionSteps(vector: number[], tipo: 'positivos' | 'negativos'): string {
  if (vector.length === 0) return "Vector vacío";
  
  const comparacion = tipo === 'positivos' ? '>= 0' : '< 0';
  let steps = `Clasificación de números ${tipo}:\n\n`;
  steps += `Inicialización: contador = 0\n\n`;
  
  let contador = 0;
  vector.forEach((num, index) => {
    const cumple = tipo === 'positivos' ? num >= 0 : num < 0;
    if (cumple) {
      contador++;
      steps += `[${index}] = ${num} → ${num} ${comparacion}? SÍ → contador = ${contador}\n`;
    } else {
      steps += `[${index}] = ${num} → ${num} ${comparacion}? NO → contador = ${contador}\n`;
    }
  });
  
  steps += `\nResultado final: ${contador} números ${tipo}`;
  return steps;
}

// Genera el código dinámico con el vector real
function generateVectorCode(vector: number[]): string {
  const preview = vector.length > 5 
    ? `[${vector.slice(0, 5).join(', ')}, ...]` 
    : `[${vector.join(', ')}]`;
  
  return `const vector: number[] = ${preview};
// Cantidad de elementos: ${vector.length}
// Acceso a elementos por índice:
${vector.slice(0, 3).map((v, i) => `vector[${i}] = ${v}`).join('\n')}`;
}

export function getSumaExplanation(vector: number[], suma: number): DynamicExplanation {
  return {
    howItWorks: `Se recorre el vector usando un bucle FOR, sumando cada elemento a un acumulador que inicia en 0.\n\n${generateSumaSteps(vector)}`,
    algorithms: [
      {
        name: "Arrays (Vectores)",
        description: `Vector actual: [${vector.join(', ')}]`,
        code: generateVectorCode(vector)
      },
      {
        name: "FOR (Bucle Para)",
        description: `Recorre los ${vector.length} elementos`,
        code: `let suma = 0;

for (let i = 0; i < ${vector.length}; i++) {
  suma += vector[i];
}
// Resultado: suma = ${suma}`
      }
    ]
  };
}

export function getPromedioExplanation(vector: number[], suma: number, promedio: number): DynamicExplanation {
  return {
    howItWorks: `Se calcula dividiendo la suma total (${suma}) entre la cantidad de elementos (${vector.length}).\n\n${generatePromedioSteps(vector, suma, promedio)}`,
    algorithms: [
      {
        name: "FOR (Bucle Para)",
        description: "Calcula la suma primero",
        code: `// Suma total: ${suma}
let suma = 0;
for (let i = 0; i < ${vector.length}; i++) {
  suma += vector[i];
}`
      },
      {
        name: "DO-WHILE (Repetir)",
        description: "Calcula y valida el promedio",
        code: `let promedio = 0;
let intentos = 0;

do {
  promedio = ${suma} / ${vector.length};
  intentos++;
  if (isNaN(promedio)) {
    promedio = 0;
  }
} while (intentos < 1);

// Resultado: ${promedio.toFixed(2)}`
      }
    ]
  };
}

export function getMaximoExplanation(vector: number[], maximo: number): DynamicExplanation {
  return {
    howItWorks: `Se inicializa el máximo con el primer elemento (${vector[0]}) y se compara con cada elemento restante usando IF dentro de un FOR.\n\n${generateMaximoSteps(vector)}`,
    algorithms: [
      {
        name: "Arrays (Vectores)",
        description: `Vector: [${vector.join(', ')}]`,
        code: generateVectorCode(vector)
      },
      {
        name: "FOR (Bucle Para) + IF (Condicional)",
        description: `Compara los ${vector.length} elementos`,
        code: `let maximo = vector[0]; // ${vector[0]}

for (let i = 1; i < ${vector.length}; i++) {
  if (vector[i] > maximo) {
    maximo = vector[i];
  }
}
// Resultado: maximo = ${maximo}`
      }
    ]
  };
}

export function getMinimoExplanation(vector: number[], minimo: number): DynamicExplanation {
  return {
    howItWorks: `Se inicializa el mínimo con el primer elemento (${vector[0]}) y se compara con cada elemento restante usando IF dentro de un FOR.\n\n${generateMinimoSteps(vector)}`,
    algorithms: [
      {
        name: "Arrays (Vectores)",
        description: `Vector: [${vector.join(', ')}]`,
        code: generateVectorCode(vector)
      },
      {
        name: "FOR (Bucle Para) + IF (Condicional)",
        description: `Compara los ${vector.length} elementos`,
        code: `let minimo = vector[0]; // ${vector[0]}

for (let i = 1; i < ${vector.length}; i++) {
  if (vector[i] < minimo) {
    minimo = vector[i];
  }
}
// Resultado: minimo = ${minimo}`
      }
    ]
  };
}

export function getPositivosExplanation(vector: number[], positivos: number): DynamicExplanation {
  return {
    howItWorks: `Se recorre cada elemento del vector y se usa un IF para verificar si es mayor o igual a cero. Cada vez que se cumple la condición, se incrementa el contador.\n\n${generateClasificacionSteps(vector, 'positivos')}`,
    algorithms: [
      {
        name: "Arrays (Vectores)",
        description: `Vector: [${vector.join(', ')}]`,
        code: generateVectorCode(vector)
      },
      {
        name: "FOR (Bucle Para) + IF (Condicional)",
        description: "Clasifica cada número",
        code: `let positivos = 0;

for (let i = 0; i < ${vector.length}; i++) {
  if (vector[i] >= 0) {
    positivos++;
  }
}
// Resultado: ${positivos} positivos`
      }
    ]
  };
}

export function getNegativosExplanation(vector: number[], negativos: number): DynamicExplanation {
  return {
    howItWorks: `Se recorre cada elemento del vector y se usa un IF para verificar si es menor a cero. Cada vez que se cumple la condición, se incrementa el contador.\n\n${generateClasificacionSteps(vector, 'negativos')}`,
    algorithms: [
      {
        name: "Arrays (Vectores)",
        description: `Vector: [${vector.join(', ')}]`,
        code: generateVectorCode(vector)
      },
      {
        name: "FOR (Bucle Para) + IF (Condicional)",
        description: "Clasifica cada número",
        code: `let negativos = 0;

for (let i = 0; i < ${vector.length}; i++) {
  if (vector[i] < 0) {
    negativos++;
  }
}
// Resultado: ${negativos} negativos`
      }
    ]
  };
}
