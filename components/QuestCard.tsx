"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface QuestTask {
  label: string;
  current: number;
  total: number;
  completed: boolean;
}

interface QuestCardProps {
  title: string;
  points: number;
  tasks: QuestTask[];
  allCompleted?: boolean;
}

function QuestProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min((current / total) * 100, 100);
  return (
    <div className="w-full h-1.5 bg-border-default rounded-full overflow-hidden mt-1">
      <div
        className="h-full bg-accent rounded-full"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function QuestCard({ title, points, tasks, allCompleted: initialAllCompleted = false }: QuestCardProps) {
  const [claimed, setClaimed] = useState(false);
  const allDone = initialAllCompleted || tasks.every((t) => t.completed || t.current >= t.total);

  return (
    <div className={`bg-bg-card border rounded-xl p-5 transition-colors ${claimed ? "border-clr-green/30" : "border-border-default"}`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-text-primary font-semibold text-sm leading-tight">{title}</h3>
        <span className="text-clr-yellow text-xs font-semibold ml-3 shrink-0">+{points} points</span>
      </div>

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <div key={i}>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${task.completed || task.current >= task.total ? "bg-clr-green border-clr-green" : "border-border-light"}`}>
                {(task.completed || task.current >= task.total) && <Check size={10} className="text-bg-base" strokeWidth={3} />}
              </div>
              <span className={`text-xs flex-1 ${task.completed || task.current >= task.total ? "text-text-secondary" : "text-text-secondary"}`}>
                {task.label}
              </span>
              {task.total > 1 && (
                <span className="text-text-muted text-xs">{task.current}/{task.total}</span>
              )}
            </div>
            <div className="ml-6">
              <QuestProgressBar current={task.current} total={task.total} />
            </div>
          </div>
        ))}
      </div>

      {allDone && !claimed && (
        <button
          onClick={() => setClaimed(true)}
          className="mt-4 w-full py-2 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors"
        >
          Claim points
        </button>
      )}
      {claimed && (
        <div className="mt-4 flex items-center gap-2 text-clr-green text-sm">
          <Check size={15} /> Points claimed!
        </div>
      )}
    </div>
  );
}
