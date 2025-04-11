
import { useState } from "react";
import { PredictionForm } from "@/components/PredictionForm";
import { ResultsVisualization } from "@/components/ResultsVisualization";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<number | null>(null);

  const handlePredictionComplete = (probability: number) => {
    setPredictionResult(probability);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-sm font-medium text-primary mb-2">MEDICAL AI ASSISTANT</p>
          <h1 className="text-4xl font-bold mb-4">Heart Attack Risk Prediction</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter patient data to receive an AI-powered assessment of heart attack risk factors based on clinical indicators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <div className="w-full">
            <PredictionForm onPredictionComplete={handlePredictionComplete} />
          </div>
          
          <div className="w-full flex justify-center">
            <ResultsVisualization probability={predictionResult || 0} />
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground animate-fade-in">
          <p>This is a demonstration model and should not be used for actual medical diagnosis.</p>
          <p>Always consult with healthcare professionals for medical advice.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
