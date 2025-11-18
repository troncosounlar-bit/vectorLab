// VectorProcessor - Demuestra todas las estructuras algorítmicas básicas

export interface VectorResults {
  suma: number;
  promedio: number;
  maximo: number;
  minimo: number;
  positivos: number;
  negativos: number;
  vector: number[];
}

export class VectorProcessor {
  
  /**
   * ESTRUCTURA: MIENTRAS (WHILE)
   * Valida que el vector no esté vacío antes de procesarlo
   */
  static validateVector(vector: number[]): boolean {
    let isValid = false;
    let attempts = 0;
    
    // MIENTRAS el vector esté vacío y no hayamos intentado más de 3 veces
    while (vector.length === 0 && attempts < 3) {
      console.log('Vector vacío detectado en intento:', attempts + 1);
      attempts++;
    }
    
    if (vector.length > 0) {
      isValid = true;
    }
    
    return isValid;
  }

  /**
   * ESTRUCTURA: PARA (FOR)
   * Calcula la suma total recorriendo el vector con índice
   */
  static calcularSuma(vector: number[]): number {
    let suma = 0;
    
    // PARA cada elemento del vector usando índice
    for (let i = 0; i < vector.length; i++) {
      suma += vector[i];
    }
    
    return suma;
  }

  /**
   * ESTRUCTURA: REPETIR (DO-WHILE)
   * Calcula el promedio asegurándose de que sea válido
   */
  static calcularPromedio(vector: number[]): number {
    let promedio = 0;
    let intentos = 0;
    
    // REPETIR hasta que el promedio sea calculado correctamente
    do {
      const suma = this.calcularSuma(vector);
      promedio = suma / vector.length;
      intentos++;
    } while (isNaN(promedio) && intentos < 3);
    
    return promedio;
  }

  /**
   * ESTRUCTURA: CONDICIONAL (IF) + PARA (FOR)
   * Encuentra el máximo y mínimo usando comparaciones
   */
  static calcularMaximoMinimo(vector: number[]): { maximo: number; minimo: number } {
    let maximo = vector[0];
    let minimo = vector[0];
    
    // PARA recorrer todo el vector
    for (let i = 1; i < vector.length; i++) {
      // IF para encontrar máximo
      if (vector[i] > maximo) {
        maximo = vector[i];
      }
      
      // IF para encontrar mínimo
      if (vector[i] < minimo) {
        minimo = vector[i];
      }
    }
    
    return { maximo, minimo };
  }

  /**
   * ESTRUCTURA: CONDICIONAL (IF) + PARA (FOR)
   * Clasifica números en positivos y negativos
   */
  static clasificarPositivosNegativos(vector: number[]): { positivos: number; negativos: number } {
    let positivos = 0;
    let negativos = 0;
    
    // PARA recorrer el vector
    for (let i = 0; i < vector.length; i++) {
      // IF para clasificar
      if (vector[i] >= 0) {
        positivos++;
      } else {
        negativos++;
      }
    }
    
    return { positivos, negativos };
  }

  /**
   * TODAS LAS ESTRUCTURAS INTEGRADAS
   * Procesa el vector completo y retorna todos los resultados
   */
  static procesarVector(vector: number[]): VectorResults | null {
    // MIENTRAS - Validación
    if (!this.validateVector(vector)) {
      return null;
    }

    // PARA - Suma
    const suma = this.calcularSuma(vector);

    // REPETIR - Promedio
    const promedio = this.calcularPromedio(vector);

    // IF - Máximo y Mínimo
    const { maximo, minimo } = this.calcularMaximoMinimo(vector);

    // IF - Clasificación
    const { positivos, negativos } = this.clasificarPositivosNegativos(vector);

    return {
      suma,
      promedio,
      maximo,
      minimo,
      positivos,
      negativos,
      vector
    };
  }

  /**
   * Genera un vector aleatorio
   */
  static generarVectorAleatorio(cantidad: number, min: number = -50, max: number = 50): number[] {
    const vector: number[] = [];
    
    for (let i = 0; i < cantidad; i++) {
      const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
      vector.push(numeroAleatorio);
    }
    
    return vector;
  }
}
