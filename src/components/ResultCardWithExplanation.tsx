import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

import type { LucideIcon } from "lucide-react";
import { Code2 } from "lucide-react";

// Badge corregido (si shadcn lo generó)
import { Badge } from "./ui/badge";

interface AlgorithmUsed {
  name: string;
  description: string;
  code: string;
}

interface ResultCardWithExplanationProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  explanation: {
    howItWorks: string;
    algorithms: AlgorithmUsed[];
  };
}

export function ResultCardWithExplanation({
  title,
  value,
  description,
  icon: Icon,
  variant = "default",
  explanation
}: ResultCardWithExplanationProps) {
  const [open, setOpen] = useState(false);

  const variantClasses = {
    default: "border-border",
    success: "border-green-500 bg-green-50 dark:bg-green-950",
    warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
    destructive: "border-red-500 bg-red-50 dark:bg-red-950"
  };

  return (
    <>
      <Card
        className={`${variantClasses[variant]} transition-all hover:shadow-lg cursor-pointer group relative`}
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>

            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
              <Code2 className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent>
          <div className="text-3xl">{value}</div>
          <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Click para ver cómo se calculó
          </p>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {Icon && <Icon className="w-6 h-6 text-indigo-600" />}
              Cálculo: {title}
            </DialogTitle>

            <DialogDescription>
              Valor calculado:{" "}
              <span className="text-2xl font-bold text-foreground">{value}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Cómo funciona */}
            <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200">
              <h4 className="mb-3 flex items-center gap-2">
                <span className="text-2xl">🧮</span>
                <span>¿Cómo se calculó?</span>
              </h4>
              <p className="text-muted-foreground leading-relaxed">{explanation.howItWorks}</p>
            </Card>

            {/* Algoritmos */}
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                <span className="text-2xl">⚙️</span>
                <span>Estructuras Algorítmicas Utilizadas</span>
              </h4>

              <div className="space-y-4">
                {explanation.algorithms.map((algo, index) => (
                  <Card key={index} className="p-4 border-l-4 border-l-indigo-600">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                        {algo.name}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{algo.description}</span>
                    </div>

                    <div className="mt-3">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{algo.code}</code>
                      </pre>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Cada operación usa estructuras algorítmicas diferentes.
              </p>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
