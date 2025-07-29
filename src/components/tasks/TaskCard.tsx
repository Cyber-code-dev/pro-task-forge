import { Task } from "@/pages/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Check, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onToggleComplete: (taskId: number) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) => {
  const createdDate = format(new Date(task.created_at), "dd MMM yyyy", { locale: fr });

  return (
    <Card className={`transition-all hover:shadow-md ${task.completed ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className={`font-semibold text-base leading-tight ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h4>
          </div>
          <Badge variant={task.completed ? "secondary" : "default"} className="ml-2">
            {task.completed ? "Terminée" : "En cours"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {task.description && (
          <p className={`text-sm text-muted-foreground line-clamp-3 ${task.completed ? 'line-through' : ''}`}>
            {task.description}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Créée le {createdDate}
        </p>
      </CardContent>

      <CardFooter className="pt-3 border-t flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggleComplete(task.id)}
          className="flex-1 mr-2"
        >
          {task.completed ? (
            <>
              <RotateCcw className="h-4 w-4 mr-1" />
              Réactiver
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-1" />
              Terminer
            </>
          )}
        </Button>
        
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;