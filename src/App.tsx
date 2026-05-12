/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Step {
  id: number;
  action: string;
  why: string;
}

const PHASES: Step[] = [
  { id: 1, action: "Run Phase 1", why: "Establishes the \"brain\" and logic of the project." },
  { id: 2, action: "Run Phase 2", why: "Gives the AI the \"eyes\" to understand the aesthetic." },
  { id: 3, action: "Feed outputs of 1 & 2 into Phase 3", why: "Provides context so the code matches the design." },
  { id: 4, action: "Final Polish with Phase 4", why: "Layering the \"voice\" over the functional structure." }
];

export default function App() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeStep, setActiveStep] = useState<number>(1);

  const toggleStep = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(step => step !== id) : [...prev, id]
    );
  };

  const calculateProgress = () => {
    return Math.round((completedSteps.length / PHASES.length) * 100);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">Project Execution Plan</h1>
          <p className="text-stone-500 text-lg">Track and manage the core phases of the project lifecycle.</p>
          
          <div className="mt-8">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-stone-600">Progress</span>
              <span className="text-stone-900">{calculateProgress()}%</span>
            </div>
            <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </header>

        <div className="space-y-4">
          <AnimatePresence>
            {PHASES.map((phase, index) => {
              const isCompleted = completedSteps.includes(phase.id);
              const isActive = activeStep === phase.id;

              return (
                <motion.div 
                  key={phase.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'border-indigo-500 bg-white shadow-xl shadow-indigo-900/5 ring-1 ring-indigo-500' 
                      : isCompleted 
                        ? 'border-stone-200 bg-stone-50/50' 
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-md'
                  }`}
                  onClick={() => setActiveStep(phase.id)}
                >
                  <div className="flex items-start gap-4">
                    <button 
                      onClick={(e) => toggleStep(e, phase.id)}
                      className="mt-1 flex-shrink-0 transition-colors duration-200 focus:outline-none"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                      ) : (
                        <Circle className="w-7 h-7 text-stone-300 hover:text-indigo-500" />
                      )}
                    </button>

                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-stone-100 text-stone-600'
                        }`}>
                          Step {phase.id}
                        </span>
                        <h3 className={`text-xl font-medium ${isCompleted ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                          {phase.action}
                        </h3>
                      </div>
                      
                      <p className={`mt-2 leading-relaxed ${isCompleted ? 'text-stone-400' : 'text-stone-600'}`}>
                        {phase.why}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0 hidden md:flex items-center justify-center opacity-0 md:opacity-100 h-10 w-10">
                      <ChevronRight className={`w-6 h-6 transition-transform ${isActive ? 'text-indigo-500 translate-x-1' : 'text-stone-300'}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <div className="mt-12 flex justify-center md:justify-start">
           <button 
             className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
             onClick={() => {
               if (completedSteps.length === PHASES.length) {
                 setCompletedSteps([]);
                 setActiveStep(1);
               } else {
                 setCompletedSteps(PHASES.map(p => p.id));
               }
             }}
           >
             {completedSteps.length === PHASES.length ? "Reset Progress" : "Mark All Complete"}
             <CheckCircle2 className="w-5 h-5" />
           </button>
        </div>
      </div>
    </div>
  );
}
