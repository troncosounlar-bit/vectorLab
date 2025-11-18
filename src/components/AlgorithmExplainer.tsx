import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Card } from "./ui/card";
import { Code2 } from "lucide-react";

interface AlgorithmInfo {
  title: string;
  description: string;
  explanation: string;
  code: string;
  usage: string;
}

const algorithmsData: Record<string, AlgorithmInfo> = {
  if: {
    title: "IF (Condicional)",
    description: "Clasificación de positivos/negativos",
    explanation: "La estructura condicional IF permite tomar decisiones en el código. Se evalúa una condición y se ejecuta un bloque de código si es verdadera, o un bloque alternativo (ELSE) si es falsa.",
    code: `// En calcularMaximoMinimo()
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

// En clasificarPositivosNegativos()
for (let i = 0; i < vector.length; i++) {
  // IF para clasificar
  if (vector[i] >= 0) {
    positivos++;
  } else {
    negativos++;
  }
}`,
    usage: "Se usa para comparar cada número del vector y determinar si es mayor/menor (máximo/mínimo) o si es positivo/negativo."
  },
  for: {
    title: "FOR (Para)",
    description: "Recorrido del vector con índice",
    explanation: "El bucle FOR permite iterar sobre una secuencia un número específico de veces. Es ideal para recorrer arrays cuando necesitamos el índice de cada elemento.",
    code: `// En calcularSuma()
static calcularSuma(vector: number[]): number {
  let suma = 0;
  
  // PARA cada elemento del vector usando índice
  for (let i = 0; i < vector.length; i++) {
    suma += vector[i];
  }
  
  return suma;
}`,
    usage: "Se usa para recorrer cada elemento del vector desde la posición 0 hasta la última, sumando todos los valores."
  },
  while: {
    title: "WHILE (Mientras)",
    description: "Validación de vector vacío",
    explanation: "El bucle WHILE ejecuta un bloque de código repetidamente MIENTRAS una condición sea verdadera. Se evalúa la condición antes de cada iteración.",
    code: `// En validateVector()
static validateVector(vector: number[]): boolean {
  let isValid = false;
  let attempts = 0;
  
  // MIENTRAS el vector esté vacío y no hayamos 
  // intentado más de 3 veces
  while (vector.length === 0 && attempts < 3) {
    console.log('Vector vacío detectado');
    attempts++;
  }
  
  if (vector.length > 0) {
    isValid = true;
  }
  
  return isValid;
}`,
    usage: "Se usa para validar que el vector tenga elementos antes de procesarlo, evitando errores de división por cero."
  },
  dowhile: {
    title: "DO-WHILE (Repetir)",
    description: "Cálculo del promedio validado",
    explanation: "El bucle DO-WHILE es similar al WHILE, pero garantiza que el bloque de código se ejecute AL MENOS UNA VEZ, ya que la condición se evalúa al final.",
    code: `// En calcularPromedio()
static calcularPromedio(vector: number[]): number {
  let promedio = 0;
  let intentos = 0;
  
  // REPETIR hasta que el promedio sea 
  // calculado correctamente
  do {
    const suma = this.calcularSuma(vector);
    promedio = suma / vector.length;
    intentos++;
  } while (isNaN(promedio) && intentos < 3);
  
  return promedio;
}`,
    usage: "Se usa para calcular el promedio asegurándose de que el resultado sea válido (no sea NaN - Not a Number)."
  },
  arrays: {
    title: "Arrays (Vectores)",
    description: "Estructura de datos principal",
    explanation: "Un array o vector es una estructura de datos que almacena múltiples valores del mismo tipo en posiciones secuenciales de memoria. Cada valor tiene un índice numérico (0, 1, 2, ...).",
    code: `// Declaración y uso de vectores
const vector: number[] = [];

// Agregar elementos
vector.push(10);
vector.push(20);
vector.push(-5);

// Acceder por índice
console.log(vector[0]); // 10
console.log(vector[1]); // 20

// Longitud del vector
console.log(vector.length); // 3

// Generación de vector aleatorio
static generarVectorAleatorio(
  cantidad: number, 
  min: number = -50, 
  max: number = 50
): number[] {
  const vector: number[] = [];
  
  for (let i = 0; i < cantidad; i++) {
    const num = Math.floor(
      Math.random() * (max - min + 1)
    ) + min;
    vector.push(num);
  }
  
  return vector;
}`,
    usage: "Es la estructura base de todo el proyecto. Almacena los números ingresados por el usuario para después procesarlos."
  },
  functions: {
    title: "Funciones",
    description: "Modularización del código",
    explanation: "Las funciones permiten encapsular bloques de código reutilizables. Ayudan a mantener el código organizado, legible y mantenible. Cada función tiene una responsabilidad específica.",
    code: `// Función estática que calcula la suma
static calcularSuma(vector: number[]): number {
  let suma = 0;
  for (let i = 0; i < vector.length; i++) {
    suma += vector[i];
  }
  return suma;
}

// Función que clasifica positivos/negativos
static clasificarPositivosNegativos(
  vector: number[]
): { positivos: number; negativos: number } {
  let positivos = 0;
  let negativos = 0;
  
  for (let i = 0; i < vector.length; i++) {
    if (vector[i] >= 0) {
      positivos++;
    } else {
      negativos++;
    }
  }
  
  return { positivos, negativos };
}`,
    usage: "Cada operación (suma, promedio, máximo, mínimo) está en su propia función, haciendo el código más limpio y fácil de entender."
  }
};

interface AlgorithmBadgeProps {
  algorithmKey: string;
  title: string;
  description: string;
}

export function AlgorithmBadge({ algorithmKey, title, description }: AlgorithmBadgeProps) {
  const [open, setOpen] = useState(false);
  const algorithm = algorithmsData[algorithmKey];

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg border cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
      >
        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
        <div className="flex-1">
          <div className="text-indigo-600 flex items-center gap-2">
            {title}
            <Code2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-indigo-600">
              <Code2 className="w-5 h-5" />
              {algorithm.title}
            </DialogTitle>
            <DialogDescription>{algorithm.description}</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Explicación */}
            <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200">
              <h4 className="mb-2">📚 ¿Qué es?</h4>
              <p className="text-muted-foreground">{algorithm.explanation}</p>
            </Card>

            {/* Código */}
            <div>
              <h4 className="mb-2">💻 Implementación en VectorLab</h4>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{algorithm.code}</code>
              </pre>
            </div>

            {/* Uso */}
            <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200">
              <h4 className="mb-2">🎯 ¿Para qué se usa aquí?</h4>
              <p className="text-muted-foreground">{algorithm.usage}</p>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
