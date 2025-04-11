
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FormData {
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
}

interface PredictionFormProps {
  onPredictionComplete: (probability: number) => void;
}

const initialFormData: FormData = {
  age: 0,
  sex: 0,
  cp: 0,
  trestbps: 0,
  chol: 0,
  fbs: 0,
  restecg: 0,
  thalach: 0,
  exang: 0,
  oldpeak: 0,
  slope: 0,
  ca: 0,
  thal: 0,
};

// Simple risk calculation based on key factors
const calculateRisk = (data: FormData): number => {
  let riskScore = 0;
  
  // Age factor (higher risk with age)
  if (data.age > 60) riskScore += 20;
  else if (data.age > 50) riskScore += 15;
  else if (data.age > 40) riskScore += 10;
  
  // Sex factor (statistically higher risk for males)
  if (data.sex === 1) riskScore += 10;
  
  // Blood pressure factor
  if (data.trestbps > 140) riskScore += 15;
  else if (data.trestbps > 120) riskScore += 10;
  
  // Cholesterol factor
  if (data.chol > 240) riskScore += 20;
  else if (data.chol > 200) riskScore += 10;
  
  // Chest pain type factor
  if (data.cp === 3) riskScore += 20; // Asymptomatic
  else if (data.cp === 1 || data.cp === 2) riskScore += 10;
  
  // Fasting blood sugar factor
  if (data.fbs === 1) riskScore += 10;
  
  // Ensure the final score is between 0 and 100
  return Math.min(Math.max(riskScore, 0), 100);
};

export const PredictionForm = ({ onPredictionComplete }: PredictionFormProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Calculate risk probability
      const probability = calculateRisk(formData);
      
      // Update the visualization
      onPredictionComplete(probability);
      
      toast.success("Prediction completed successfully!");
    } catch (error) {
      toast.error("An error occurred during prediction");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <Card className="w-full max-w-2xl p-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sex">Sex (1 = male, 0 = female)</Label>
            <Input
              id="sex"
              name="sex"
              type="number"
              min="0"
              max="1"
              value={formData.sex}
              onChange={handleInputChange}
              className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cp">Chest Pain Type (0-3)</Label>
            <Input
              id="cp"
              name="cp"
              type="number"
              min="0"
              max="3"
              value={formData.cp}
              onChange={handleInputChange}
              className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trestbps">Resting Blood Pressure</Label>
            <Input
              id="trestbps"
              name="trestbps"
              type="number"
              value={formData.trestbps}
              onChange={handleInputChange}
              className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chol">Cholesterol</Label>
            <Input
              id="chol"
              name="chol"
              type="number"
              value={formData.chol}
              onChange={handleInputChange}
              className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fbs">Fasting Blood Sugar</Label>
            <Input
              id="fbs"
              name="fbs"
              type="number"
              min="0"
              max="1"
              value={formData.fbs}
              onChange={handleInputChange}
              className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full transition-all duration-300 hover:scale-[1.02]"
          disabled={loading}
        >
          {loading ? "Processing..." : "Predict Heart Disease Risk"}
        </Button>
      </form>
    </Card>
  );
};
