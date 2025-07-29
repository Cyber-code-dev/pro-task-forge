import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, User, LogOut } from "lucide-react";
import TaskList from "@/components/tasks/TaskList";
import TaskDialog from "@/components/tasks/TaskDialog";
import ProfileDialog from "@/components/profile/ProfileDialog";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsTaskDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleSaveTask = async (taskData: Omit<Task, "id" | "created_at">) => {
    try {
      if (editingTask) {
        // Update existing task
        // TODO: Implement API call to update task
        const updatedTasks = tasks.map(task =>
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        );
        setTasks(updatedTasks);
        toast({
          title: "Tâche mise à jour",
          description: "La tâche a été modifiée avec succès",
        });
      } else {
        // Create new task
        // TODO: Implement API call to create task
        const newTask: Task = {
          id: Date.now(), // Temporary ID, should come from backend
          ...taskData,
          created_at: new Date().toISOString(),
        };
        setTasks([newTask, ...tasks]);
        toast({
          title: "Tâche créée",
          description: "La nouvelle tâche a été ajoutée avec succès",
        });
      }
      setIsTaskDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      // TODO: Implement API call to delete task
      setTasks(tasks.filter(task => task.id !== taskId));
      toast({
        title: "Tâche supprimée",
        description: "La tâche a été supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive",
      });
    }
  };

  const handleToggleComplete = async (taskId: number) => {
    try {
      // TODO: Implement API call to toggle task completion
      const updatedTasks = tasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestionnaire de Tâches</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsProfileDialogOpen(true)}
            >
              <User className="h-4 w-4 mr-2" />
              Profil
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Mes Tâches</h2>
            <p className="text-muted-foreground">
              Gérez vos tâches quotidiennes efficacement
            </p>
          </div>
          <Button onClick={handleCreateTask}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Tâche
          </Button>
        </div>

        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      </main>

      {/* Dialogs */}
      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        task={editingTask}
        onSave={handleSaveTask}
      />

      <ProfileDialog
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
      />
    </div>
  );
};

export default Dashboard;