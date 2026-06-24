import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Wifi, Server } from 'lucide-react';

export const Dashboard = () => {
  const [threatsBlocked, setThreatsBlocked] = useState(14502);
  const [activeNodes, setActiveNodes] = useState(842);
  const [riskScore, setRiskScore] = useState(12);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatsBlocked((prev) => prev + Math.floor(Math.random() * 5));
      setActiveNodes((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(800, Math.min(900, prev + change));
      });
      setRiskScore((prev) => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(5, Math.min(25, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-24 relative z-10 bg-background-darker/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 text-white text-glow">
            Live Threat <span className="text-primary">Intelligence</span>
          </h2>
          <p className="text-gray-400">
            Real-time monitoring and proactive defense mechanisms at work.
          </p>
        </div>

        <div className="glass-panel p-6 md:p-10 rounded-3xl border border-primary/20 shadow-[0_0_50px_rgba(0,245,255,0.05)]">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
              <span className="text-success font-mono tracking-wider font-semibold">SYSTEM SECURE & ACTIVE</span>
            </div>
            <div className="text-gray-400 font-mono text-sm">
              Node: ALPHA-7 | Uptime: 99.99%
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Stat Cards */}
            <div className="bg-background-darker/80 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <ShieldAlert className="w-6 h-6 text-primary" />
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded font-mono">+12%</span>
              </div>
              <h4 className="text-gray-400 text-sm font-medium mb-1">Threats Blocked</h4>
              <div className="text-3xl font-bold font-space text-white">
                {threatsBlocked.toLocaleString()}
              </div>
            </div>

            <div className="bg-background-darker/80 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <Server className="w-6 h-6 text-accent" />
                <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded font-mono">LIVE</span>
              </div>
              <h4 className="text-gray-400 text-sm font-medium mb-1">Active Nodes</h4>
              <div className="text-3xl font-bold font-space text-white">
                {activeNodes}
              </div>
            </div>

            <div className="bg-background-darker/80 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <Activity className="w-6 h-6 text-success" />
                <span className="text-xs text-success bg-success/10 px-2 py-1 rounded font-mono">LOW</span>
              </div>
              <h4 className="text-gray-400 text-sm font-medium mb-1">Risk Score</h4>
              <div className="text-3xl font-bold font-space text-white flex items-baseline gap-1">
                {riskScore} <span className="text-sm text-gray-500 font-sans">/ 100</span>
              </div>
            </div>

            <div className="bg-background-darker/80 p-6 rounded-2xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <Wifi className="w-6 h-6 text-secondary" />
                <span className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded font-mono">2ms</span>
              </div>
              <h4 className="text-gray-400 text-sm font-medium mb-1">Network Latency</h4>
              <div className="text-3xl font-bold font-space text-white flex items-baseline gap-1">
                12 <span className="text-sm text-gray-500 font-sans">ms</span>
              </div>
            </div>
          </div>

          {/* Animated Graph Area */}
          <div className="bg-background-darker/80 p-6 rounded-2xl border border-white/5 h-64 relative overflow-hidden flex flex-col justify-end">
            <h4 className="absolute top-6 left-6 text-gray-400 text-sm font-medium">Network Traffic Analysis</h4>
            <div className="flex items-end justify-between gap-2 h-3/4 opacity-70">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [`${Math.random() * 40 + 20}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 40 + 20}%`]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full bg-gradient-to-t from-primary/10 to-primary/60 rounded-t-sm"
                />
              ))}
            </div>
            {/* Scanning Line overlay */}
            <motion.div 
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-1 bg-primary shadow-[0_0_20px_rgba(0,245,255,1)] z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
