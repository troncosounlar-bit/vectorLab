import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { NumberInput } from "./components/NumberInput";
import { VectorDisplay } from "./components/VectorDisplay";
import { ResultCardWithExplanation } from "./components/ResultCardWithExplanation";

// 🔥 Importación corregida
import type { VectorResults } from "./utils/vectorProcessor";
import { VectorProcessor } from "./utils/vectorProcessor";

import { 
  Calculator, 
  TrendingUp, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  PlusCircle, 
  MinusCircle,
  Sparkles,
  Edit3
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";

import {
  getSumaExplanation,
  getPromedioExplanation,
  getMaximoExplanation,
  getMinimoExplanation,
  getPositivosExplanation,
  getNegativosExplanation
} from "./utils/dynamicExplanations";

export default function App() {
  const [cantidad, setCantidad] = useState<number>(10);
  const [vector, setVector] = useState<number[]>([]);
  const [manualVector, setManualVector] = useState<number[]>([]);
  const [resultados, setResultados] = useState<VectorResults | null>(null);
  const [mode, setMode] = useState<"auto" | "manual">("auto");

  const handleGenerarAleatorio = () => {
    if (cantidad < 1 || cantidad > 100) {
      alert("Por favor ingresa una cantidad entre 1 y 100");
      return;
    }

    const nuevoVector = VectorProcessor.generarVectorAleatorio(cantidad, -50, 50);
    setVector(nuevoVector);
    setResultados(null);
  };

  const handleProcesar = () => {
    const vectorAProcesar = mode === "auto" ? vector : manualVector;

    if (vectorAProcesar.length === 0) {
      alert("Por favor genera o ingresa números primero");
      return;
    }

    const resultado = VectorProcessor.procesarVector(vectorAProcesar);

    if (resultado) {
      setResultados(resultado);
    } else {
      alert("Error al procesar el vector");
    }
  };

  const handleAgregarNumeroManual = (numero: number) => {
    if (manualVector.length < 100) {
      setManualVector([...manualVector, numero]);
    }
  };

  const handleLimpiarManual = () => {
    setManualVector([]);
    setResultados(null);
  };

  const handleLimpiarTodo = () => {
    setVector([]);
    setManualVector([]);
    setResultados(null);
    setCantidad(10);
  };

  const vectorActual = mode === "auto" ? vector : manualVector;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="w-full flex flex-col items-center space-y-4">

          {/* Logos izquierda - derecha */}
          <div className="w-full flex items-center justify-between px-4">

            {/* Logo Izquierdo */}
            <img 
              src="/Logo VL.png" 
              alt="Logo VectorLab"
              className="h-24 w-auto object-contain"
            />

            {/* ------------ TÍTULO + BOTONES ------------ */}
            <div className="flex flex-col items-center flex-1 px-4">

              {/* TÍTULO */}
              <p className="text-muted-foreground mb-3 text-center">
                Procesador Inteligente de Arreglos — Estructuras
              </p>

              {/* 🔵 FILA CON 5 BOTONES IGUALES */}
              <div className="grid grid-cols-5 gap-3 w-full max-w-3xl">

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:shadow-lg text-xs font-semibold tracking-wide text-center"
                >
                  Condicional<br/>IF
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:shadow-lg text-xs font-semibold tracking-wide text-center"
                >
                  Para<br/>FOR
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:shadow-lg text-xs font-semibold tracking-wide text-center"
                >
                  Mientras<br/>WHILE
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:shadow-lg text-xs font-semibold tracking-wide text-center"
                >
                  Repetir<br/>DO-WHILE
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:shadow-lg text-xs font-semibold tracking-wide text-center"
                >
                  Arrays<br/>Vectores
                </motion.button>

              </div>
            </div>

            {/* Logo Derecho */}
            <img 
              src="/Logo TUI.png" 
              alt="Logo TUI"
              className="h-24 w-auto object-contain"
            />
          </div>
        </div>

        {/* ----------------- Main Content ----------------- */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración del Vector</CardTitle>
            <CardDescription>
              Elige cómo deseas crear tu vector de números
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} onValueChange={(v) => setMode(v as "auto" | "manual")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="auto">Generación Automática</TabsTrigger>
                <TabsTrigger value="manual">Entrada Manual</TabsTrigger>
              </TabsList>

              {/* AUTO */}
              <TabsContent value="auto" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <NumberInput
                    label="Cantidad de elementos"
                    value={cantidad}
                    onChange={setCantidad}
                    placeholder="Ingresa un número"
                    min={1}
                    max={100}
                  />

                  <div className="flex items-end">
                    <Button onClick={handleGenerarAleatorio} className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar Aleatorio
                    </Button>
                  </div>
                </div>

                <Alert>
                  <AlertTitle>Generación Automática</AlertTitle>
                  <AlertDescription>
                    Se generarán números aleatorios entre -50 y 50
                  </AlertDescription>
                </Alert>
              </TabsContent>

              {/* MANUAL */}
              <TabsContent value="manual" className="space-y-4">
                <ManualInput 
                  onAdd={handleAgregarNumeroManual}
                  onClear={handleLimpiarManual}
                  count={manualVector.length}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Vector Display */}
        {vectorActual.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Vector Actual</CardTitle>
            </CardHeader>
            <CardContent>
              <VectorDisplay vector={vectorActual} title="" />

              <div className="flex gap-2 mt-4 justify-center">
                <Button onClick={handleProcesar} size="lg">
                  <Calculator className="w-4 h-4 mr-2" />
                  Procesar Vector
                </Button>
                <Button onClick={handleLimpiarTodo} variant="outline" size="lg">
                  Limpiar Todo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resultados */}
        {resultados && (
          <div className="space-y-4">
            <h2 className="text-center">Resultados del Procesamiento</h2>
            <p className="text-center text-muted-foreground text-sm">
              💡 Haz click en cualquier tarjeta para ver cómo se calculó
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {/* Suma */}
              <ResultCardWithExplanation
                title="Suma Total"
                value={resultados.suma}
                description="Suma de todos los elementos"
                icon={Calculator}
                explanation={getSumaExplanation(vectorActual, resultados.suma)}
              />

              {/* Promedio */}
              <ResultCardWithExplanation
                title="Promedio"
                value={resultados.promedio.toFixed(2)}
                description="Media aritmética"
                icon={TrendingUp}
                explanation={getPromedioExplanation(vectorActual, resultados.suma, resultados.promedio)}
              />

              {/* Máximo */}
              <ResultCardWithExplanation
                title="Máximo"
                value={resultados.maximo}
                description="Valor más alto"
                icon={ArrowUpCircle}
                variant="success"
                explanation={getMaximoExplanation(vectorActual, resultados.maximo)}
              />

              {/* Mínimo */}
              <ResultCardWithExplanation
                title="Mínimo"
                value={resultados.minimo}
                description="Valor más bajo"
                icon={ArrowDownCircle}
                variant="destructive"
                explanation={getMinimoExplanation(vectorActual, resultados.minimo)}
              />

              {/* Positivos */}
              <ResultCardWithExplanation
                title="Positivos"
                value={resultados.positivos}
                description="Números ≥ 0"
                icon={PlusCircle}
                variant="success"
                explanation={getPositivosExplanation(vectorActual, resultados.positivos)}
              />

              {/* Negativos */}
              <ResultCardWithExplanation
                title="Negativos"
                value={resultados.negativos}
                description="Números < 0"
                icon={MinusCircle}
                variant="destructive"
                explanation={getNegativosExplanation(vectorActual, resultados.negativos)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- MANUAL INPUT ---------------- */

function ManualInput({ onAdd, onClear, count }: { onAdd: (n: number) => void; onClear: () => void; count: number }) {
  const [inputValue, setInputValue] = useState<number>(0);

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue(0);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <NumberInput
            label="Número a agregar"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Ingresa un número"
          />
        </div>

        <div className="flex items-end gap-2">
          <Button onClick={handleAdd} className="flex-1">
            <Edit3 className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">Elementos agregados: {count}</p>
        {count > 0 && (
          <Button onClick={onClear} variant="outline" size="sm">
            Limpiar
          </Button>
        )}
      </div>
    </div>
  );
}
