import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckSquare, Users, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="max-w-4xl mx-auto">
          <CheckSquare className="h-16 w-16 mx-auto mb-8 text-primary" />
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Gestionnaire de Tâches
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Organisez votre quotidien avec simplicité. Créez, gérez et suivez vos tâches en toute efficacité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/register">Commencer gratuitement</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/login">Se connecter</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <CheckSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Gestion simple</h3>
              <p className="text-muted-foreground">Créez et organisez vos tâches en quelques clics</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Interface rapide</h3>
              <p className="text-muted-foreground">Navigation fluide et intuitive pour une productivité maximale</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Profil personnalisé</h3>
              <p className="text-muted-foreground">Gérez votre compte et personnalisez votre expérience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
